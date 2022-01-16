import Header from "./Header";

const Layout = ({ childern }) => {
  return (
    <>
      <Header />
      <main>{childern}</main>
    </>
  );
};

export default Layout;
