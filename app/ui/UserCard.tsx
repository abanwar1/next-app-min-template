'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Text, Button, Paper, Group, Anchor,Grid } from '@mantine/core';
import { IconPhoneCall, IconAt, IconWorld, IconUserPlus, IconTrash, IconUserMinus,IconStar } from '@tabler/icons-react';
import classes from './UserInfoIcons.module.css';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  follow: string;
}

export default function UserCard() {
  const [users, setUsers] = useState<User[]>([]);

  //fetching data from the api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data:User[] = await response.json();
        // adding follow key with unfollow value for keep track of followed user
        const usersWithFollow = data.map(user => ({ ...user, follow: 'Unfollow' }));
        setUsers(usersWithFollow);
      } catch (error) {
        //handling error in case of error
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  //Handling onclick follow btn
  const handleFollow = (userId: number) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, follow: user.follow === 'Follow' ? 'Unfollow' : 'Follow' };
      }
      return user;
    }));
  };

  //handleing onclick delete btn  
  const handleDelete = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <Grid m="sm">
      {users.map((user) => (
         <Grid.Col key={user.id} span={{ base: 12, md: 6, lg: 3 }}>
        <Paper  radius="md" withBorder p="lg" bg="var(--mantine-color-body)" style={{  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
          <Avatar
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            size={120}
            radius={120}
            mx="auto"
          />
          <Text ta="center" fz="lg" fw={500} mt="md">
            {user.name} 
            {user.follow === 'Follow' ? <IconStar size="1rem" /> : null}
          </Text>
          <div style={{}}>
            <Group wrap="nowrap" gap={10} mt={3}>
              <IconAt stroke={1.5} size="1.1rem" className={classes.icon} />
              <Anchor fz="md" c="dimmed" href={`mailto:${user.email}`} target="_blank"  underline="hover" type="email">
                {user.email}
              </Anchor>
            </Group>

            <Group wrap="nowrap" gap={10} mt={5}>
              <IconPhoneCall stroke={1.5} size="1.1rem" className={classes.icon} />
              <Anchor fz="md" c="dimmed" href={`tel:${user.phone}`} target="_blank"  underline="hover" rel="noopener noreferrer" >
                {user.phone}
              </Anchor>
            </Group>

            <Group wrap="nowrap" gap={10} mt={5}>
              <IconWorld stroke={1.5} size="1.1rem" className={classes.icon} />
              <Anchor fz="md" c="dimmed" href={`https://${user.website}`} target="_blank"  underline="hover" rel="noopener noreferrer" >
                {user.website}
              </Anchor>
            </Group>
          </div>

          <Group  mt="md">
            {(user.follow) === 'Unfollow' ? (<Button leftSection={<IconUserPlus style={{ width: '1rem', height: '1rem' }} />} variant="filled" style={{ flex: '1 1'}} onClick={()=> handleFollow(user.id)}>
              Follow
            </Button>) : (<Button leftSection={<IconUserMinus style={{ width: '1rem', height: '1rem' }} />} variant="default"style={{ flex: '1 1'}}  onClick={()=> handleFollow(user.id)}>
              Unfollow
            </Button>)}

            <Button
              leftSection={<IconTrash style={{ width: '1rem', height: '1rem' }} />}
              variant="outline"
              style={{ flex: '1 1' }}
              onClick={()=>handleDelete(user.id)}
            >
              Delete
            </Button>
          </Group>
        </Paper>
        </Grid.Col>
      ))}
    </Grid>
  );
}
