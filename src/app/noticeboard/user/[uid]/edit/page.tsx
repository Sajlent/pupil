'use client';

import { useState } from 'react';

import { useAuthContext } from '@/app/providers';
import { getUser } from '@/app/lib/actions';
import { IUserData } from '@/app/types/User';

import styles from './user.module.scss';
import Button from '@/app/ui/forms/button/button';
import { ButtonTypes, ButtonVariants } from '@/app/types/Forms';

export default function Page({ params }: { params: { uid: string } }) {
  const uid = params.uid;

  return <p>Edit user: {uid} </p>;
}
