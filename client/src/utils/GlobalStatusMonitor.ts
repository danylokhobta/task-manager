'use client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setGlobalStatus } from '@/store/globalSlice';

const GlobalStatusMonitor = () => {
  const dispatch = useDispatch();
  const userStatus = useSelector((state: RootState) => state.user.status);
  const taskStatus = useSelector((state: RootState) => state.tasks.status);

  useEffect(() => {
    const statuses = [userStatus, taskStatus];

    if (statuses.includes('loading')) {
      dispatch(setGlobalStatus('loading'));
    } else if (statuses.includes('error')) {
      dispatch(setGlobalStatus('error'));
    } else if (statuses.every(status => status === 'success')) {
      dispatch(setGlobalStatus('success'));
    } else {
      dispatch(setGlobalStatus('idle'));
    }
  }, [userStatus, taskStatus, dispatch]);

  return null; // It only listens and reacts
};

export default GlobalStatusMonitor;