import useGlobal from '../store/globalStore';

export default function Loader() {
  const { isLoaded } = useGlobal();
  return (
    !isLoaded &&
    <div className='absolute center -top-15'>
      <div className="w-8 h-8 border-7 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}