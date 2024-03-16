'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useAuthContext } from '@/app/providers';
import { getUser } from '@/app/lib/actions';
import { IUserData } from '@/app/types/User';

import styles from './user.module.scss';
import Button from '@/app/ui/forms/button/button';
import Badge from '@/app/ui/noticeboard/badge/badge';
import { ButtonTypes, ButtonVariants } from '@/app/types/Forms';

const animalsSchema = {
  cat: {
    icon: 'cat.svg',
    label: 'koty',
    alt: 'Ikona kota',
  },
  dog: {
    icon: 'dog.svg',
    label: 'psy',
    alt: 'Ikona psa',
  },
  fish: {
    icon: 'fish.svg',
    label: 'rybki',
    alt: 'Ikona ryby',
  },
  rodent: {
    icon: 'rodent.svg',
    label: 'gryzonie',
    alt: 'Ikona chomika',
  },
  rabbit: {
    icon: 'rabbit.svg',
    label: 'króliki',
    alt: 'Ikona królika',
  },
  bird: {
    icon: 'bird.svg',
    label: 'ptaki',
    alt: 'Ikona ptaka',
  },
};

export default function Page({ params }: { params: { uid: string } }) {
  const { currentUser } = useAuthContext();
  const [data, setData] = useState<IUserData | null>(null);
  const uid = params.uid;
  const isCurrentUserProfile = uid === currentUser?.uid;

  getUser(uid).then((user) => {
    if (user && !data) {
      setData(user as IUserData);
    }
  });

  if (!currentUser || !data) return null;

  return (
    <section className={styles.root}>
      {/* column left */}
      <div>
        <div className={styles.photo}>
          <Image src="/images/cat.jpg" width={128} height={128} alt="Cat" />
        </div>
        <div className={styles.card}>
          <dl>
            <dt className={styles.details__title}>Imię i nazwisko</dt>
            <dd className={styles.details__content}>
              {data.firstname} {data.lastname}
            </dd>
            <dt className={styles.details__title}>Kilka słów o mnie</dt>
            <dd className={styles.details__content}>{data.summary}</dd>
          </dl>
        </div>
      </div>
      {/* column right */}
      <div>
        <header className={styles.header}>
          <h1>Profil opiekuna {data.displayName}</h1>
          {isCurrentUserProfile && (
            <Link href={`/noticeboard/user/${currentUser.uid}/edit`}>
              <Button
                variant={ButtonVariants.ICON}
                icon="pencil"
                title="Edytuj profil"
                type={ButtonTypes.BUTTON}
              />
            </Link>
          )}
        </header>
        <article className={styles.card}>
          <h2 className={styles.details__heading}>O mnie</h2>
          <dl>
            <dt className={styles.details__title}>Opis</dt>
            <dd className={styles.details__content}>{data.description}</dd>
            <dt className={styles.details__title}>Umiejętności</dt>
            <dd className={styles.details__content}>{data.skills}</dd>
          </dl>
        </article>
        <article className={styles.card}>
          {/* TODO: handle & style animal list */}
          <h2 className={styles.details__heading}>Opiekuję się zwierzętami</h2>
          <ul className={styles.details__list}>
            {data.animals.map((animal) => {
              const { label, icon, alt } = animalsSchema[animal];
              return (
                <li key={animal}>
                  <Badge label={label} icon={icon} alt={alt} />
                </li>
              );
            })}
          </ul>
        </article>
      </div>
    </section>
  );
}
