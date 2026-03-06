import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Praveen() {
  const navigate = useNavigate();
  const [showImage, setShowImage] = useState('praveen');

  useEffect(() => {
    if (showImage === 'praveen') {
      const timer = setTimeout(() => {
        setShowImage('image');
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        navigate('/sha256');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showImage, navigate]);

  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <img
        src={showImage === 'praveen' ? '/Praveen.png' : '/image.png'}
        alt="Praveen"
        className="w-full h-full object-center"
      />
    </div>
  );
}
