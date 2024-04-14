import UserCard from "./ui/UserCard";
import { Grid, Skeleton, Container } from '@mantine/core';

const child = <Skeleton height={140} radius="md" animate={false} />;

export default function HomePage() {
  return(
      <div>
        <UserCard/>
      </div>
  );
}
