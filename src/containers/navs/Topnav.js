import React, { Component } from "react";
import { injectIntl } from "react-intl";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  changeLocale,
  storageVouchers,
  storageUsers,
  storageRestaurantes
} from "../../redux/actions";

import {
  menuHiddenBreakpoint,
  searchPath,
} from "../../constants/defaultValues";

import { MobileMenuIcon, MenuIcon } from "../../components/svg";
import { getApi } from '../../environment/environment';
import { getDirection, setDirection } from "../../helpers/Utils";
import moment from 'moment/min/moment-with-locales'
import Events from '../../helpers/Events'

const server = getApi('url');
moment.locale('pt-BR');

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInFullScreen: false,
      searchKeyword: ""
    };
  }

  componentDidMount(){
    let d = new Date();
    let hour = d.getHours();
    if(hour < 5) {
      this.setState({
        hour: "Boa noite"
      })
    }
    else if(hour < 8) {
      this.setState({
        hour: "Bom dia"
      })
    }
    else if(hour < 12) {
      this.setState({
        hour: "Bom dia"
      })
    }
    else if(hour < 18) {
      this.setState({
        hour: "Boa tarde"
      })
    }
    else {
      this.setState({
        hour: "Boa noite"
      })
    }



    let user = localStorage.getItem("user");
    user = JSON.parse(user)
    let name = user && user.user && user.user.name.split(" ");
    let cidades = localStorage.getItem("cidades");
    this.setState({
      name: name && name[0],
      user: user.user,
      accountType: user.user.type === 'ADMIN' ? "Administrador" : "Moderador"
    })

    this.buscarRestaurantes(cidades)
    this.loadVouchers()
    this.users()
  }


	buscarRestaurantes = async (cidade) => {
		//Requisição de Buscar Historico de Transações
		let response = await fetch(server + `admin/getRestaurants/${cidade}`)
		response = await response.json()
    console.log('rest', response);
		if (!response.error) {
      let postivo = []
      let negativo = []
      await Promise.all(response.restaurantes.map( (item, index) => {
        if (item.status) {
          return postivo.push(item);
        } else {
          return negativo.push(item);
        }
      }))
      let total = [];
      total = postivo.concat(negativo);
      this.props.storageRestaurantes(total)
		}
	}

  async loadVouchers(){
    //Requisição de 
    let response = await fetch(server + `voucher/listAll`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify()
    });
    response = await response.json()
    if (!response.error) {
      this.props.storageVouchers(response.vouchers);
    }
  }


  async users(){
		//Requisição de Buscar Historico de Transações
		let response = await fetch(server + `admin/subscribers`)
		response = await response.json();
    console.log('[USER REQ LIST]', response);
    if (!response.error) {     
      this.props.storageUsers(response);
    }
	}

  handleChangeLocale = (locale, direction) => {
    this.props.changeLocale(locale);

    const currentDirection = getDirection().direction;
    if (direction !== currentDirection) {
      setDirection(direction);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  handleSearchIconClick = e => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains("search")) {
        if (e.target.parentElement.classList.contains("search")) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains("search")
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains("mobile-view")) {
        this.search();
        elem.classList.remove("mobile-view");
        this.removeEventsSearch();
      } else {
        elem.classList.add("mobile-view");
        this.addEventsSearch();
      }
    } else {
      this.search();
    }
  };

  addEventsSearch = () => {
    document.addEventListener("click", this.handleDocumentClickSearch, true);
  };

  removeEventsSearch = () => {
    document.removeEventListener("click", this.handleDocumentClickSearch, true);
  };

  handleDocumentClickSearch = e => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("navbar") ||
        e.target.classList.contains("simple-icon-magnifier"))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains("simple-icon-magnifier")) {
        this.search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains("search")
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector(".mobile-view");
      if (input && input.classList) input.classList.remove("mobile-view");
      this.removeEventsSearch();
      this.setState({
        searchKeyword: ""
      });
    }
  };

  handleSearchInputChange = e => {
    this.setState({
      searchKeyword: e.target.value
    });
  };
  handleSearchInputKeyPress = e => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  search = () => {
    this.props.history.push(searchPath + "/" + this.state.searchKeyword);
    this.setState({
      searchKeyword: ""
    });
  };

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen
    });
  };

  handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    this.props.logoutUser(this.props.history);
  };

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.props.selectedMenuHasSubItems
    );
  };
  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  };

  render() {
    const { containerClassnames, menuClickCount } = this.props;
    // const { messages } = this.props.intl;
    
    return (
      <nav className="navbar fixed-top">
        <div className="d-flex align-items-center navbar-left">
          <NavLink
            to="#" location={{}}
            className="menu-button d-none d-md-block"
            onClick={e =>
              this.menuButtonClick(e, menuClickCount, containerClassnames)
            }
          >
            <MenuIcon />
          </NavLink>
          <NavLink
            to="#" location={{}}
            className="menu-button-mobile d-xs-block d-sm-block d-md-none"
            onClick={e => this.mobileMenuButtonClick(e, containerClassnames)}
          >
            <MobileMenuIcon />
          </NavLink>

          {/* <div className="search" data-search-path="/app/pages/search">
            <Input
              name="searchKeyword"
              id="searchKeyword"
              placeholder={messages["menu.search"]}
              value={this.state.searchKeyword}
              onChange={e => null}
              onKeyPress={e => null}
            />
            <span
              className="search-icon"
              onClick={e => null}
            >
              <i className="simple-icon-magnifier" />
            </span>
          </div> */}

          
          {/* <div className="position-relative d-none d-none d-lg-inline-block">
            <a
              className="btn btn-outline-primary btn-sm ml-2"
              target="_top"
              href="/app/depositar"
            >
              <IntlMessages id="user.depositar" />
            </a>
          </div> */}
        </div>
        <a className="navbar-logo" href="/">
          <img className="d-none d-xs-block" src="/assets/img/dourado.png" alt="" style={{height: 60, right: 30, bottom: '25%', position: 'relative'}}/>
          <img className="d-block d-xs-none" src="/assets/img/dourado.png"  alt="" style={{height: 40, right: 60, bottom: '5%', position: 'relative'}}/>
        </a>
        <div className="navbar-right">

          <div className="header-icons d-inline-block align-middle">
  
          </div>
          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
              <div style={{ display: 'flex', flexDirection: 'row'}}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: "center"}}>

                  <span style={{ fontSize: 15, color: "#8f8f8f"}} className="name mr-1">{this.state.hour}, {this.state.name}!</span>
                  <span style={{ fontSize: 12, color: "#8f8f8f", fontWeight: "300"}} className="name mr-1">{this.state.accountType}</span>
                </div>
                <span>
                  <img alt="Profile" src={this.state.user && this.state.user.foto ? this.state.user.foto : "/assets/icons/user.png"} />
                </span>
              </div>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                <DropdownItem>
                  <NavLink to="/app/perfil">Perfil</NavLink>
                </DropdownItem>
                {/* <DropdownItem>
                  <NavLink to="/app/historico">Histórico</NavLink>
                </DropdownItem> */}
                {/* <DropdownItem>Suporte</DropdownItem> */}
                <DropdownItem divider />
                <DropdownItem onClick={() => this.handleLogout()}>
                  Sair da minha conta
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale
  };
};
export default injectIntl(
  connect(
    mapStateToProps,
    { setContainerClassnames, clickOnMobileMenu, logoutUser, changeLocale, storageVouchers, storageUsers, storageRestaurantes }
  )(TopNav)
);
