'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/shared/components/Button/Button';
import { Grid } from '@/shared/components/Grid/Grid';
import { GridItem } from '@/shared/components/Grid/GridItem';
import { Input } from '@/shared/components/Input/Input';
import { Typography } from '@/shared/components/Typography/Typography';
import { Table } from '@/shared/components/Table/Table';
import { ProjectUsers } from '@/modules/projects/presentation/components/ProjectUsers/ProjectUsers';
import { Chip } from '@/shared/components/Chip/Chip';
import { useProjectStore } from '@/modules/projects/data/store/useProjectStore';
import { Project } from '@/modules/projects/data/models/Projects.interface';
import {
  PROJECT_LIST_COLUMNS,
  PROJECT_PLAN_COLORS,
  PROJECT_PLAN_LABELS,
  PROJECT_STATUS_COLORS,
  PROJECT_STATUS_LABELS,
  ROWS_PER_PAGE
} from '@/modules/projects/data/constants/Projects.constant';
import mockProjects from '@/modules/projects/data/mocks/mock_data.json';

const ProjectsPage = () => {
  const { projects, setProjects } = useProjectStore();
  const [currentPage, setCurrentPage] = useState(0);

  const allTableData = useMemo(() => {
    return projects.map((project) => {
      const countIncidents = project.incidents.filter(i => i.item === 'incidents').length;
      const countRFI = project.incidents.filter(i => i.item === 'RFI').length;
      const countTasks = project.incidents.length - (countIncidents + countRFI);
      const statusLabel = PROJECT_STATUS_LABELS[project.status] || project.status;
      const statusColors = PROJECT_STATUS_COLORS[project.status] || { bg: 'neutral-100', text: 'neutral-400' };
      const planKey = project.projectPlanData.plan.toLowerCase();
      const planLabel = PROJECT_PLAN_LABELS[planKey] || planKey.toUpperCase();
      const planColors = PROJECT_PLAN_COLORS[planKey] || { bg: 'neutral-100', text: 'default' };
  
      return ({
        _highlightColor: project.status === 'active',
        projectInfo: (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography weight={'bold'}>{project.title}</Typography>
            <Typography variant={'xs'} color={'muted'}>{project.createdAt}</Typography>
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography weight={'bold'} variant={'sm'}>{countIncidents}</Typography>
              <Typography variant={'xs'} color={'muted'}>Incidencias</Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography weight={'bold'} variant={'sm'}>{countRFI}</Typography>
              <Typography variant={'xs'} color={'muted'}>RFI</Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography weight={'bold'} variant={'sm'}>{countTasks}</Typography>
              <Typography variant={'xs'} color={'muted'}>Tareas</Typography>
            </div>
          </div>
        ),
      });
    });
  }, [projects]);

  const paginatedData = useMemo(() => {
    const start = currentPage * ROWS_PER_PAGE;
    return allTableData.slice(start, start + ROWS_PER_PAGE);
  }, [allTableData, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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
            <Typography>Filters</Typography>
          </GridItem>
          <GridItem portrait={12} landscape={4} desktop={4}>
            <Input
              placeholder={'Buscar'}
              isFullWidth
            />
          </GridItem>
          <GridItem portrait={12} landscape={4} desktop={4}>
            <Button 
              text={'Crear proyecto'}
              onClick={() => alert('crear')}
              isFullWidth
            />
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem span={12}>
        <div style={{ height: 648 }}>
          <Table 
            columns={PROJECT_LIST_COLUMNS} 
            data={paginatedData} 
            pagination={{
              totalCount: allTableData.length,
              page: currentPage,
              rowsPerPage: ROWS_PER_PAGE,
              onPageChange: handlePageChange
            }}
          />
        </div>
      </GridItem>
    </Grid>
  );
};

export default ProjectsPage;
