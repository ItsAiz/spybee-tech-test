'use client';

import { useEffect } from 'react';
import { Button } from '@/shared/components/Button/Button';
import { Grid } from '@/shared/components/Grid/Grid';
import { GridItem } from '@/shared/components/Grid/GridItem';
import { Input } from '@/shared/components/Input/Input';
import { Typography } from '@/shared/components/Typography/Typography';
import { TableColumn } from '@/shared/data/models/Table.interface';
import { Table } from '@/shared/components/Table/Table';
import { ProjectUsers } from '@/modules/projects/presentation/components/ProjectUsers/ProjectUsers';
import { useProjectStore } from '@/modules/projects/data/store/useProjectStore';
import { Project } from '@/modules/projects/data/models/Projects.interface';
import mockProjects from '@/modules/projects/data/mocks/mock_data.json';

const ProjectsPage = () => {
  const { projects, setProjects } = useProjectStore();

  const columns: TableColumn[] = [
    { header: 'Proyecto', accessor: 'projectInfo' },
    { header: 'Plan', accessor: 'plan' },
    { header: 'Estado', accessor: 'state' },
    { header: 'Equipo', accessor: 'partners' },
    { header: 'Items por vencer', accessor: 'itemsToBeat', align: 'center' },
  ];

  const tableData = projects.map((project) => {
    const countIncidents = project.incidents.filter(i => i.item === 'incidents').length;
    const countRFI = project.incidents.filter(i => i.item === 'RFI').length;
    const countTasks = project.incidents.length - (countIncidents + countRFI);

    return ({
      _highlightColor: project.status === 'active' ? 'var(--success)' : '',
      projectInfo: (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography weight={'bold'}>{project.title}</Typography>
          <Typography variant={'xs'} color={'muted'}>{project.createdAt}</Typography>
        </div>
      ),
      plan: project.projectPlanData.plan.toUpperCase(),
      state: project.status,
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
        <Typography variant={'display'} weight={'bold'}>
          Mis proyectos
        </Typography>
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
        <div style={{ height: 656 }}>
          <Table columns={columns} data={tableData} />
        </div>
      </GridItem>
    </Grid>
  );
};

export default ProjectsPage;
