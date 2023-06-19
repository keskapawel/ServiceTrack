import { useEffect } from 'react';
import { useAppDispatch } from 'hooks/store-hook';
import { useParams } from 'react-router-dom';
import { useUserSelector } from 'reducers/user-reducer';

import { setSelectedUser } from 'reducers/user-reducer';

import { Header } from './components/Header/Header';
import { MainSection } from './components/MainSection/MainSection';
import { Loader } from 'components/common/Loader';

export const SingleUserContainer = () => {
  const dispatch = useAppDispatch();
  const { selectedUser } = useUserSelector();

  console.log(selectedUser, 'selectedUser');

  const isLoading = false;

  useEffect(() => {
    // return () => {
    //   dispatch(setSelectedUser({ selectedUser: null }));
    // };
  }, [dispatch]);

  return isLoading || !selectedUser ? (
    <Loader />
  ) : (
    <>
      <Header
        data={{
          createdAt: selectedUser?.createdAt,
          lastLogin: selectedUser?.lastLogin,
        }}
      />
      <MainSection data={selectedUser} />
    </>
  );
};
