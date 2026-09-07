'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';
import type { ActionResult } from '../actionResult';

function parseList(value: FormDataEntryValue | null): string[] {
  return String(value ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

async function replaceSubgroups(skillGroupId: string, formData: FormData) {
  await prisma.skillSubgroup.deleteMany({ where: { skillGroupId } });

  const subgroups: { labelEn: string; labelId: string; skills: string; order: number }[] = [];
  for (let i = 0; i < 2; i++) {
    const labelEn = String(formData.get(`subgroupLabelEn${i}`) ?? '').trim();
    if (!labelEn) continue;
    const labelId = String(formData.get(`subgroupLabelId${i}`) ?? '').trim();
    subgroups.push({
      labelEn,
      labelId: labelId || labelEn,
      skills: JSON.stringify(parseList(formData.get(`subgroupSkills${i}`))),
      order: i,
    });
  }

  if (subgroups.length > 0) {
    await prisma.skillSubgroup.createMany({
      data: subgroups.map((s) => ({ ...s, skillGroupId })),
    });
  }
}

function groupDataFromForm(formData: FormData) {
  const hasSubgroups =
    String(formData.get('subgroupLabelEn0') ?? '').trim() !== '' ||
    String(formData.get('subgroupLabelEn1') ?? '').trim() !== '';

  return {
    titleEn: String(formData.get('titleEn') ?? ''),
    titleId: String(formData.get('titleId') ?? ''),
    icon: String(formData.get('icon') ?? ''),
    order: Number(formData.get('order')) || 0,
    skills: hasSubgroups ? null : JSON.stringify(parseList(formData.get('skills'))),
  };
}

export async function createSkillGroup(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  try {
    const group = await prisma.skillGroup.create({ data: groupDataFromForm(formData) });
    await replaceSubgroups(group.id, formData);
  } catch (error) {
    console.error('createSkillGroup failed:', error);
    return { success: false, message: 'Failed to save skill group.' };
  }

  revalidatePath('/');
  revalidatePath('/admin/skills');
  return { success: true, message: 'Skill group created successfully.' };
}

export async function updateSkillGroup(
  id: string,
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  try {
    await prisma.skillGroup.update({ where: { id }, data: groupDataFromForm(formData) });
    await replaceSubgroups(id, formData);
  } catch (error) {
    console.error('updateSkillGroup failed:', error);
    return { success: false, message: 'Failed to save skill group.' };
  }

  revalidatePath('/');
  revalidatePath('/admin/skills');
  return { success: true, message: 'Skill group updated successfully.' };
}

export async function deleteSkillGroup(id: string) {
  await requireAdmin();
  await prisma.skillGroup.delete({ where: { id } });

  revalidatePath('/');
  revalidatePath('/admin/skills');
}
