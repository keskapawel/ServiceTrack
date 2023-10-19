import { useUserSelector } from 'reducers/user-reducer';

import { Header } from './components/Header/Header';
import { MainSection } from './components/MainSection/MainSection';
import { Loader } from 'components/common/Loader';
import { useParams } from 'react-router-dom';
import { useGetSingleUserQuery } from 'services/users';
import { isLoadingByStatusCode } from 'hooks/statusCode-hooks';

interface IProps {
  createNew?: boolean;
}

export const SingleUserContainer = ({ createNew }: IProps) => {
  const { selectedUser } = useUserSelector();
  const { id } = useParams();
  const { data } = useGetSingleUserQuery({ id: id ?? selectedUser?.id ?? '' });

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
            isEnabled: String(data?.data.user?.isEnabled),
            isExpired: String(data?.data.user?.isExpired),
          }}
        />
      )}
      <MainSection data={data?.data.user ?? selectedUser} createNewMode={createNew} />
    </>
  );
};
