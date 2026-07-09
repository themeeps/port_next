import ProjectForm from '../ProjectForm';
import { createProject } from '../actions';

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">New Project</h1>
      <ProjectForm action={createProject} redirectTo="/admin/projects" />
    </div>
  );
}
