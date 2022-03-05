import LoadingSpinner from '../../components/ui/animation/LoadingSpinner';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { sendGoogleAuthCode } from '../../api/user';
import { useQuery } from 'react-query';
import { PageLayout } from '../../components/layout/PageLayout';
import Cookies from 'universal-cookie';
import { authState } from '../../store/store';
import { useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';

const GoogleRedirectPage: React.FC = () => {
  const cookie = new Cookies();
  const setAuthenticated = useSetRecoilState(authState);

  const authCode = new URL(window.location.href).searchParams.get('code');

  const {
    data: token,
    isError,
    isSuccess,
  } = useQuery('send-authCode', () => sendGoogleAuthCode(authCode), {
    cacheTime: 0,
  });

  if (isError) {
    Swal.fire('로그인에 실패했습니다.');
    return <Navigate to='/login' />;
  }

  if (isSuccess) {
    cookie.set('access_token', token?.data.jwt);
    setAuthenticated(true);
    return <Navigate to='/' />;
  }

  return (
    <PageLayout>
      <LoadingSpinner />
    </PageLayout>
  );
};
export default GoogleRedirectPage;
