import { Link } from 'react-router-dom';
const Navbar = () => {
  let Links = [
    { name: 'Plans', link: '/plans' },
    { name: 'Attendace', link: '/attendance' },
    { name: 'Users', link: '/users' },
  ];

  return (
    <div className="shadow-md w-full  relative top-0 left-0">
      <div className="md:flex flex-row justify-center  bg-white py-4 md:px-10 px-7">
        <div className="container md:flex flex-row ">
          <div className="basis-1/4 justify-start font-bold  text-2xl cursor-pointer">
            <Link to={'/'}>Brofit+</Link>
          </div>
          <div className="basis-1/2">
            <ul className="md:flex flex-row justify-center md:items-center">
              {Links.map((link) => (
                <li className="md:ml-8 text-xl" key={link.name}>
                  <Link to={link.link}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="basis-1/4 ">
            <div className="md:flex flex-row justify-end md:ml-8 text-xl">
              <Link to={'/login'}>Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
