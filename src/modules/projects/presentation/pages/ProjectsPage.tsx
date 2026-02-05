'use client';

import { Box } from "@/shared/components/Box/Box";
import { Button } from "@/shared/components/Button/Button";
import { Grid } from "@/shared/components/Grid/Grid";
import { GridItem } from "@/shared/components/Grid/GridItem";
import { Input } from "@/shared/components/Input/Input";
import { Typography } from "@/shared/components/Typography/Typography";

const ProjectsPage = () => {
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
        <Box
          padding={4}
          borderType={'solid'}
          borderColor={'secondary-200'}
          width={'100%'}
          height={'648px'}
        >
          Tabla aca
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ProjectsPage;
