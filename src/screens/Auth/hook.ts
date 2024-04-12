import { useMemo } from 'react';
import { useAppSelector ,useAppDispatch} from '../../../redux/hook';
import { setCredential ,useIsLoading, useSelectAuthToken, useSelectCurrentUser } from '../../../redux/auth';

export const useAuth = () => {
  const user = useAppSelector(useSelectCurrentUser);
  const isLoading = useAppSelector(useIsLoading);

  return useMemo(
    () => ({ user: user ? { ...user, } : null, isLoading }),
    [user, isLoading]
  );
};

export const useAuthToken = () => {
  const token = useAppSelector(useSelectAuthToken);
  return useMemo(() => ({ access_token: token }), [token]);
}

export const usePushToken = () => {
  const { pushId } = useAppSelector((state) => state.auth);
  return useMemo(() => pushId, [pushId]);
};

export const useInterestsPin = () => {
  const user = useAppSelector(useSelectCurrentUser);
  return useMemo(
    () => ({
      hasInterest: Boolean(user?.interests),
      hasPin: Boolean(user?.pin),
      verified: Boolean(user?.otp_verified)
    }),
    [user]
  );
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  // branch.logout()
  return () => dispatch(setCredential({}));
};

