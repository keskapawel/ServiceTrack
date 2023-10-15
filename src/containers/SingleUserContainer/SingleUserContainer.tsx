import { useUserSelector } from 'reducers/user-reducer';

import { Header } from './components/Header/Header';
import { MainSection } from './components/MainSection/MainSection';
import { Loader } from 'components/common/Loader';

export const SingleUserContainer = () => {
  const { selectedUser } = useUserSelector();

  const isLoading = false;

  return isLoading || !selectedUser ? (
    <Loader />
  ) : (
    <>
      <Header
        data={{
          createdAt: selectedUser?.createdAt,
          lastLogin: selectedUser?.lastLoginDateTime,
        }}
      />
      <MainSection data={selectedUser} />
    </>
  );
};
