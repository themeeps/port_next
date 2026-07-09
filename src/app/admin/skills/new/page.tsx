import SkillGroupForm from '../SkillGroupForm';
import { createSkillGroup } from '../actions';

export default function NewSkillGroupPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">New Skill Group</h1>
      <SkillGroupForm action={createSkillGroup} redirectTo="/admin/skills" />
    </div>
  );
}
