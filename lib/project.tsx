import * as React from 'react';
import { colors } from '../constants/theme';

interface ProjectContextValue {
  name: string;
  description: string;
  accentColor: string;
}

const ProjectContext = React.createContext<ProjectContextValue>({
  name: 'AED Connect',
  description: 'The member platform for equipment distribution',
  accentColor: colors.accent,
});

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const value = React.useMemo(() => ({
    name: 'AED Connect',
    description: 'The member platform for equipment distribution',
    accentColor: colors.accent,
  }), []);

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  return React.useContext(ProjectContext);
}
