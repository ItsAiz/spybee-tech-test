'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { ArrowDownWideNarrow, LayoutGrid, List, MapPin, Plus, Search, ChevronLeft } from 'lucide-react';
import { Button } from '@/shared/components/Button/Button';
import { Grid } from '@/shared/components/Grid/Grid';
import { Box } from '@/shared/components/Box/Box';
import { GridItem } from '@/shared/components/Grid/GridItem';
import { Input } from '@/shared/components/Input/Input';
import { Typography } from '@/shared/components/Typography/Typography';
import { Table } from '@/shared/components/Table/Table';
import { ProjectUsers } from '@/modules/projects/presentation/components/ProjectUsers/ProjectUsers';
import { Chip } from '@/shared/components/Chip/Chip';
import { MapView } from '@/modules/projects/presentation/components/MapView';
import { ResumeView } from '@/modules/projects/presentation/components/ResumeView';
import { TableCellValue } from '@/shared/data/models/Table.interface';
import { useProjectStore } from '@/modules/projects/data/store/useProjectStore';
import { Project, SortByProject } from '@/modules/projects/data/models/Projects.interface';
import {
  PROJECT_LIST_COLUMNS,
  PROJECT_PLAN_COLORS,
  PROJECT_PLAN_LABELS,
  PROJECT_STATUS_COLORS,
  PROJECT_STATUS_LABELS,
  ROWS_PER_PAGE,
  SORT_PROJECTS_OPTIONS
} from '@/modules/projects/data/constants/Projects.constant';
import mockProjects from '@/modules/projects/data/mocks/mock_data.json';
import styles from './styles.module.css';

const StatItem = ({ count, label }: { count: number; label: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <Typography weight={'bold'} variant={'sm'}>{count}</Typography>
    <Typography variant={'xs'} color={'muted'}>{label}</Typography>
  </div>
);

const ProjectsPage = () => {
  const { projects, setProjects } = useProjectStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<SortByProject>('title');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showResume, setShowResume] = useState(false);

  const getCount = (project: Project, type: string) => {
    return project.incidents.filter((i) => i.item === type).length;
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
    setCurrentPage(0);
  };

  const handleSearchChange = () => {
    setSearchTerm(inputValue);
    setCurrentPage(0);
  };

  const currentProjectsData = useMemo(() => {
    const filtered = projects.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title, undefined, { numeric: true });
      } else {
        comparison = getCount(a, sortBy) - getCount(b, sortBy);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    const start = currentPage * ROWS_PER_PAGE;
    return sorted.slice(start, start + ROWS_PER_PAGE);
  }, [projects, searchTerm, sortBy, sortOrder, currentPage]);

  const allTableData = useMemo(() => {
    return currentProjectsData.map((project) => {
      const countIncidents = project.incidents.filter((i) => i.item === 'incidents').length;
      const countRFI = project.incidents.filter((i) => i.item === 'RFI').length;
      const countTasks = project.incidents.filter((i) => i.item === 'task').length;
      const statusLabel = PROJECT_STATUS_LABELS[project.status] || project.status;
      const statusColors = PROJECT_STATUS_COLORS[project.status] || { bg: 'neutral-100', text: 'neutral-400' };
      const planKey = project.projectPlanData.plan.toLowerCase();
      const planLabel = PROJECT_PLAN_LABELS[planKey] || planKey.toUpperCase();
      const planColors = PROJECT_PLAN_COLORS[planKey] || { bg: 'neutral-100', text: 'default' };
  
      return ({
        id: project._id,
        _highlightColor: project.status === 'active',
        projectInfo: (
          <div className={styles['project-info-container']}>
            <div className={styles['image-rapper']}>
              {project?.img && project.img !== 'xxx' && !project.img.includes('firebasestorage') && (
                <Image 
                  src={project.img} 
                  alt={`Logo de ${project.title}`}
                  fill
                  sizes={'40px'}
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography weight={'bold'}>{project.title}</Typography>
              <Typography variant={'xs'} color={'muted'}>{project.createdAt}</Typography>
            </div>
          </div>
        ),
        plan: (
          <Chip 
            label={planLabel}
            bgColor={planColors.bg}
            textColor={planColors.text}
            minWidth={'80px'}
            isBoldText
          />
        ),
        state: (
          <Chip 
            label={statusLabel}
            bgColor={statusColors.bg}
            textColor={statusColors.text}
            minWidth={'100px'}
            isBoldText
          />
        ),
        partners: (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <ProjectUsers users={project.users} />
          </div>
        ),
        itemsToBeat: (
          <div style={{ display: 'flex', gap: 'var(--space-8)', justifyContent: 'center' }}>
            <StatItem count={countIncidents} label={'Incidencias'} />
            <StatItem count={countRFI} label={'RFI'} />
            <StatItem count={countTasks} label={'Tareas'} />
          </div>
        ),
      });
    });
  }, [currentProjectsData]);

  const handleRowClick = (row: Record<string, TableCellValue>) => {
    const project = currentProjectsData.find((p) => p._id === row.id);
    if (!project) return;
    if (selectedProject?._id === project._id && showMap) {
      setShowMap(false);
      setSelectedProject(null);
    } else {
      setSelectedProject(project);
      setShowMap(true);
    }
  };

  const projectsForMap = useMemo(() => {
    return selectedProject ? [selectedProject] : currentProjectsData;
  }, [selectedProject, currentProjectsData]);

  const fetchData = async () => {
    try {
      const data = mockProjects as Project[];
      if (projects.length === 0) {
        setProjects(data);
      }
    } catch (error) {
      console.error('Error cargando los proyectos:', error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const renderFilterButtons = () => (
    <div className={styles['action-filters-container']}>
      <button 
        className={'square-button'}
        onClick={toggleSortOrder}
        style={{ marginRight: 'var(--space-2)' }}
      >
        <div style={{ transform: sortOrder === 'asc' ? 'rotate(180deg)' : 'none', transition: '0.2s' }}>
          <ArrowDownWideNarrow size={16} color={'var(--secondary-500)'} />
        </div>
      </button>
      <div style={{ position: 'relative' }}>
        <button 
          className={'square-button'} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ backgroundColor: isMenuOpen ? 'var(--neutral-200)' : 'transparent' }}
        >
          <List size={16} color={'var(--secondary-500)'} />
        </button>
        {isMenuOpen && (
          <>
            <div 
              onClick={() => setIsMenuOpen(false)} 
              style={{ position: 'fixed', inset: 0, zIndex: 10 }} 
            />
            <div className={styles['dropdown-menu']}>
              {SORT_PROJECTS_OPTIONS.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    setSortBy(opt.value);
                    setIsMenuOpen(false);
                    setCurrentPage(0);
                  }}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    backgroundColor: sortBy === opt.value ? 'var(--primary-100)' : 'transparent',
                    borderRadius: 'var(--radius-sm)',
                    transition: '0.2s'
                  }}
                >
                  <Typography variant={'xs'} weight={sortBy === opt.value ? 'bold' : 'regular'}>
                    {opt.label}
                  </Typography>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <button className={'square-button'}>
        <LayoutGrid size={16} color={'var(--secondary-500)'} />
      </button>
      <button 
        className={'square-button'}
        onClick={() => {
          if (showMap) {
            setShowMap(false);
            setSelectedProject(null);
          } else {
            setShowMap(true);
          }
        }}
        style={{ backgroundColor: showMap ? 'var(--neutral-200)' : '' }}
      >
        <MapPin size={16} color={'var(--secondary-500)'} />
      </button>
    </div>
  );

  return (
    <Grid withSidebar>
      <GridItem portrait={12} landscape={6} desktop={6}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--space-2)', alignItems: 'center' }}>
          <Typography variant={'display'} weight={'bold'}>
            Mis proyectos
          </Typography>
          <Chip bgColor={'secondary-200'} label={`${projects.length} proyectos`} />
        </div>
      </GridItem>
      <GridItem portrait={12} landscape={6} desktop={6}>
        <Grid isSubGrid>
          <GridItem portrait={12} landscape={4} desktop={4}>
            {renderFilterButtons()}
          </GridItem>
          <GridItem portrait={12} landscape={4} desktop={4}>
            <Input
              placeholder={'Buscar'}
              endIcon={<Search size={16} color={'var(--neutral-400)'} />}
              onChange={(e) => setInputValue(e.target.value)}
              onEndIconClick={handleSearchChange}
              isFullWidth
            />
          </GridItem>
          <GridItem portrait={12} landscape={4} desktop={4}>
            <Button 
              text={'Crear proyecto'}
              leftIcon={<Plus size={16} />}
              onClick={() => alert('crear')}
              isFullWidth
            />
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem span={12}>
        <div style={{ position: 'relative' }}>
          <button
            className={'square-button'}
            onClick={() => setShowResume(!showResume)}
            style={{
              position: 'absolute',
              right: '-16px',
              top: showMap ? '266px' : '16px',
              zIndex: 20,
              backgroundColor: 'var(--base-white)',
              boxShadow: 'var(--shadow-md)',
              transition: 'all 0.3s ease',
              borderRadius: 'var(--radius-pill) !important'
            }}
          >
            <div 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease',
                transform: showResume ? 'rotate(180deg)' : 'rotate(0deg)' 
              }}
            >
              <ChevronLeft size={16} color={'var(--secondary-500)'} />
            </div>
          </button>
        </div>
        <Grid isSubGrid>
          <GridItem portrait={12} landscape={showResume ? 8 : 12} desktop={showResume ? 8 : 12}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {showMap && (
                <div
                  style={{
                    height: '250px',
                    width: '100%',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: '1px solid var(--secondary-200)',
                    animation: 'fadeIn 0.3s ease'
                  }}
                >
                  <MapView projects={projectsForMap} />
                </div>
              )}
              <div style={{
                height: showMap ? '380px' : '648px',
                transition: 'all 0.3s ease',
                overflow: 'auto'
              }}>
                <Table
                  columns={PROJECT_LIST_COLUMNS}
                  data={allTableData}
                  onRowClick={handleRowClick}
                  pagination={{
                    totalCount: projects.length,
                    page: currentPage,
                    rowsPerPage: ROWS_PER_PAGE,
                    onPageChange: handlePageChange
                  }}
                />
              </div>
            </div>
          </GridItem>
          {showResume && (
            <GridItem portrait={12} landscape={4} desktop={4}>
              <div className={styles['resume-animation-wrapper']}>
                <Box height={'648px'} padding={'var(--space-4)'}>
                  <ResumeView />
                </Box>
              </div>
            </GridItem>
          )}
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default ProjectsPage;
