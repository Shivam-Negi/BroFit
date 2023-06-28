import { Link } from 'react-router-dom';
import CapsuleButton from './CapsuleButton';
import '../css/Navbar.css';

const handleClick = () => {
  console.log('Button clicked');
};

const Navbar = () => {
  let Links = [
    { name: 'Plans', link: '/plans' },
    { name: 'Attendace', link: '/attendance' },
    { name: 'Users', link: '/users' },
  ];

  return (
    <div className="shadow-md w-full  relative top-0 left-0">
      <div className="md:flex flex-row justify-center  bg-transparent py-4 md:px-10 px-7">
        <div className="container md:flex flex-row ">
          <div className="basis-1/4 justify-start font-bold  text-2xl cursor-pointer">
            <Link to={'/'}>Brofit+</Link>
          </div>

          <div className="basis-1/2 md:border-white md:border-2 rounded-full md:flex flex-row justify-center content-center ">
            <ul className=" social-media-list md:flex flex-row  md:items-center">
              {Links.map((link) => (
                <li
                  className="md:mx-10 text-xl transition-all  transform-gpu hover:px-1 rounded-lg  hover:bg-white hover:color-black hover:shadow-lg "
                  key={link.name}>
                  <Link to={link.link}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="basis-1/4 ">
            <div className="md:flex flex-row justify-end md:ml-8 text-xl">
              <Link to={'/login'}>
                <CapsuleButton
                  text="Login"
                  onClick={handleClick}
                  color="#ffffff"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
