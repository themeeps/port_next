'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';
import type { ActionResult } from '../actionResult';

export async function updateBio(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();
  const bio = String(formData.get('bio') ?? '');

  try {
    await prisma.aboutContent.upsert({
      where: { id: 'about' },
      update: { bio },
      create: { id: 'about', bio },
    });
  } catch (error) {
    console.error('updateBio failed:', error);
    return { success: false, message: 'Failed to save bio.' };
  }

  revalidatePath('/');
  revalidatePath('/admin/about');
  return { success: true, message: 'Bio updated successfully.' };
}

function highlightDataFromForm(formData: FormData) {
  return {
    icon: String(formData.get('icon') ?? ''),
    title: String(formData.get('title') ?? ''),
    desc: String(formData.get('desc') ?? ''),
    order: Number(formData.get('order')) || 0,
  };
}

export async function createHighlight(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  try {
    await prisma.aboutHighlight.create({ data: highlightDataFromForm(formData) });
  } catch (error) {
    console.error('createHighlight failed:', error);
    return { success: false, message: 'Failed to save highlight.' };
  }

  revalidatePath('/');
  revalidatePath('/admin/about');
  return { success: true, message: 'Highlight created successfully.' };
}

export async function updateHighlight(
  id: string,
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  try {
    await prisma.aboutHighlight.update({ where: { id }, data: highlightDataFromForm(formData) });
  } catch (error) {
    console.error('updateHighlight failed:', error);
    return { success: false, message: 'Failed to save highlight.' };
  }

  revalidatePath('/');
  revalidatePath('/admin/about');
  return { success: true, message: 'Highlight updated successfully.' };
}

export async function deleteHighlight(id: string) {
  await requireAdmin();
  await prisma.aboutHighlight.delete({ where: { id } });

  revalidatePath('/');
  revalidatePath('/admin/about');
}
