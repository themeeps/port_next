'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';
import { uploadProjectImage, deleteProjectImage } from '@/lib/blob';
import type { ActionResult } from '../actionResult';

function parseTechList(value: FormDataEntryValue | null): string {
  const raw = String(value ?? '');
  const list = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return JSON.stringify(list);
}

function projectDataFromForm(formData: FormData) {
  return {
    title: String(formData.get('title') ?? ''),
    description: String(formData.get('description') ?? ''),
    icon: String(formData.get('icon') ?? ''),
    tech: parseTechList(formData.get('tech')),
    githubUrl: String(formData.get('githubUrl') ?? ''),
    liveUrl: String(formData.get('liveUrl') ?? ''),
    order: Number(formData.get('order')) || 0,
  };
}

export async function createProject(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  try {
    const file = formData.get('image');
    const image = file instanceof File && file.size > 0 ? await uploadProjectImage(file) : null;

    await prisma.project.create({ data: { ...projectDataFromForm(formData), image } });
  } catch (error) {
    console.error('createProject failed:', error);
    const message = error instanceof Error ? error.message : 'Failed to save project.';
    return { success: false, message };
  }

  revalidatePath('/');
  revalidatePath('/admin/projects');
  return { success: true, message: 'Project created successfully.' };
}

export async function updateProject(
  id: string,
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  try {
    const existing = await prisma.project.findUnique({ where: { id }, select: { image: true } });
    const file = formData.get('image');
    let image = existing?.image ?? null;

    if (file instanceof File && file.size > 0) {
      image = await uploadProjectImage(file);
      await deleteProjectImage(existing?.image);
    }

    await prisma.project.update({ where: { id }, data: { ...projectDataFromForm(formData), image } });
  } catch (error) {
    console.error('updateProject failed:', error);
    const message = error instanceof Error ? error.message : 'Failed to save project.';
    return { success: false, message };
  }

  revalidatePath('/');
  revalidatePath('/admin/projects');
  return { success: true, message: 'Project updated successfully.' };
}

export async function deleteProject(id: string) {
  await requireAdmin();

  const project = await prisma.project.findUnique({ where: { id }, select: { image: true } });
  await prisma.project.delete({ where: { id } });
  await deleteProjectImage(project?.image);

  revalidatePath('/');
  revalidatePath('/admin/projects');
}
