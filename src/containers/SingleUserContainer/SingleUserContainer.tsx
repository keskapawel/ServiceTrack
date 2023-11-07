import { useUserSelector } from 'reducers/user-reducer';

import { Header } from './components/Header/Header';
import { MainSection } from './components/MainSection/MainSection';
import { Loader } from 'components/common/Loader';
import { useParams } from 'react-router-dom';
import { useGetSingleUserQuery } from 'services/users';
import { isLoadingByStatusCode } from 'hooks/statusCode-hooks';
import { skipToken } from '@reduxjs/toolkit/dist/query';

interface IProps {
  createNew?: boolean;
}

export const SingleUserContainer = ({ createNew }: IProps) => {
  const { selectedUser } = useUserSelector();
  const { id } = useParams();
  const { data } = useGetSingleUserQuery(!createNew ? { id: id ?? selectedUser?.uuid ?? '' } : skipToken);

  const isLoading = isLoadingByStatusCode(data?.status);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {!createNew && (
        <Header
          data={{
            creationDate: data?.data.user?.creationDate,
            lastLogin: data?.data.user?.lastLoginDateTime,
            enabled: String(data?.data.user?.enabled),
            expired: String(data?.data.user?.expired),
          }}
        />
      )}
      <MainSection data={data?.data.user ?? selectedUser} createNewMode={createNew} />
    </>
  );
};
