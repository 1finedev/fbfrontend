import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AuthService from './../../services/AuthService';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const Header = (...props) => {
  const [isOpen, setIsOpen] = useState();
  const { isAuthenticated, role } = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const toggle = () => setIsOpen(!isOpen);

  const updateRoles = () => {
    if (role === 'admin') {
      return adminHeader();
    }
    if (role === 'sec') {
      return secHeader();
    }
    if (role === 'mod') {
      return modHeader();
    } else {
      return userHeader();
    }
  };
  const logout = async () => {
    toggle();
    const res = await AuthService.logout();

    if (res.status === 'success') {
      authContext.setIsLoading(true);
      authContext.setIsAuthenticated(false);
      authContext.setUser(null);
      window.location.href = '/login';
      authContext.setIsLoading(false);
      return;
    }
  };

  const nliHeader = () => {
    return (
      <div className="app-header">
        <section className="top_header_area">
          <div className="container top_nav">
            <div className="topnavcenter">
              <span>
                <Link to="#">
                  <i className="fa fa-phone"></i>+90-534-227-4973
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="fa fa-envelope-o"></i>support@fortebridge.com
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="fa fa-clock-o"></i>Mon - Sat 09:00am - 8:00pm
                </Link>
              </span>
            </div>
          </div>
        </section>
        <Navbar style={{ backgroundColor: '#111f29' }} dark expand="md">
          <NavbarBrand className="navbar" href="/">
            FORTE BRIDGE CARGO
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/tracktrace">Shipment Tracking</NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Our Services
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Air Freight</DropdownItem>
                  <DropdownItem>Sea Cargo</DropdownItem>
                  <DropdownItem>Terminal Charges</DropdownItem>
                  <DropdownItem>Flight Schedule</DropdownItem>
                  <DropdownItem>Accredited Agents</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <i className="fa fa-window-close" aria-hidden="true"></i>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="#">Network & Locations</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">About us</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>
              <Link to="login" onClick={toggle}>
                Login{' '}
              </Link>
              /{' '}
              <Link to="register" onClick={toggle}>
                Register{' '}
              </Link>
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  };

  const userHeader = () => {
    return (
      <>
        <section className="top_header_area">
          <div className="container top_nav">
            <div className="topnavcenter">
              <span>
                <Link to="#">
                  <i className="fa fa-phone"></i>+90-552-615-7375
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="fa fa-envelope-o"></i>
                  support@fortebridge.com
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="fa fa-clock-o"></i>Mon - Sat 09:00am - 8:00pm
                </Link>
              </span>
            </div>
          </div>
        </section>
        <Navbar style={{ backgroundColor: '#111f29' }} dark expand="md">
          <NavbarBrand className="navbar" href="/profile">
            FORTE BRIDGE CARGO
          </NavbarBrand>

          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/shipment">Shipments</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Customers</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/tracktrace">Track and Trace</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Payments</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Account
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Profile</DropdownItem>
                  <DropdownItem>Change Password</DropdownItem>
                  <DropdownItem>Delete Account</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <i className="fa fa-window-close" aria-hidden="true"></i>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>
              <Link to="#" onClick={logout}>
                Logout
              </Link>
            </NavbarText>
          </Collapse>
        </Navbar>
      </>
    );
  };

  const modHeader = () => {
    return (
      <>
        <section className="top_header_area">
          <div className="container top_nav">
            <div className="topnavcenter">
              <span>
                <Link to="#">
                  <i className="fa fa-phone"></i>+90-552-615-7375
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="fa fa-envelope-o"></i>
                  support@fortebridge.com
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="fa fa-clock-o"></i>Mon - Sat 09:00am - 8:00pm
                </Link>
              </span>
            </div>
          </div>
        </section>
        <Navbar style={{ backgroundColor: '#111f29' }} dark expand="md">
          <NavbarBrand className="navbar" href="/profile">
            FORTE BRIDGE CARGO
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="#">Shipments</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Customers</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/tracktrace">Track and Trace</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Payments</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Account
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Profile</DropdownItem>
                  <DropdownItem>Change Password</DropdownItem>
                  <DropdownItem>Delete Account</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <i className="fa fa-window-close" aria-hidden="true"></i>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>
              <Link to="#" onClick={logout}>
                Logout
              </Link>
            </NavbarText>
          </Collapse>
        </Navbar>
      </>
    );
  };

  const adminHeader = () => {
    return (
      <>
        <section className="top_header_area">
          <div className="container top_nav">
            <div className="topnavcenter">
              <span>
                <Link to="#">
                  <i className="fa fa-phone"></i>+90-552-615-7375
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="fa fa-envelope-o"></i>support@fortebridge.com
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="fa fa-clock-o"></i>Mon - Sat 09:00am - 8:00pm
                </Link>
              </span>
            </div>
          </div>
        </section>
        <Navbar style={{ backgroundColor: '#111f29' }} dark expand="md">
          <NavbarBrand className="navbar" href="/">
            FORTE BRIDGE CARGO
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/tracktrace">Shipment Tracking</NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Our Services
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Air Freight</DropdownItem>
                  <DropdownItem>Sea Cargo</DropdownItem>
                  <DropdownItem>Terminal Charges</DropdownItem>
                  <DropdownItem>Flight Schedule</DropdownItem>
                  <DropdownItem>Accredited Agents</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <i className="fa fa-window-close" aria-hidden="true"></i>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="#">Network & Locations</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">About us</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>
              <Link to="login" onClick={toggle}>
                Login{' '}
              </Link>
              /{' '}
              <Link to="register" onClick={toggle}>
                Register{' '}
              </Link>
            </NavbarText>
          </Collapse>
        </Navbar>
      </>
    );
  };

  const secHeader = () => {
    return (
      <>
        <section className="top_header_area">
          <div className="container top_nav">
            <div className="topnavcenter">
              <span>
                <Link to="#">
                  <i className="fa fa-phone"></i>+90-552-615-7375
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="fa fa-envelope-o"></i>
                  support@fortebridge.com
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="fa fa-clock-o"></i>Mon - Sat 09:00am - 8:00pm
                </Link>
              </span>
            </div>
          </div>
        </section>
        <Navbar style={{ backgroundColor: '#111f29' }} dark expand="md">
          <NavbarBrand className="navbar" href="/profile">
            FORTE BRIDGE CARGO
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/AddShipment">Shipments</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Customers</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/tracktrace">Track and Trace</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Payments</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Account
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Profile</DropdownItem>
                  <DropdownItem>Change Password</DropdownItem>
                  <DropdownItem>Delete Account</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <i className="fa fa-window-close" aria-hidden="true"></i>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>
              <Link to="#" onClick={logout}>
                Logout
              </Link>
            </NavbarText>
          </Collapse>
        </Navbar>
      </>
    );
  };
  return <div>{isAuthenticated ? updateRoles() : nliHeader()}</div>;
};

export default Header;
