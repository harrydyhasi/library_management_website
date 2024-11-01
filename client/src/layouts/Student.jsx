// Chakra imports
import { ChakraProvider, Portal, useDisclosure  } from '@chakra-ui/react';
import Configurator from 'components/Configurator/Configurator';
// Layout components
import Sidebar from '../components/Sidebar';
import SidebarStudent from '../components/Sidebar/Student';
import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../Routes/studentRoutes';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// Custom Chakra theme
import theme from '../theme/theme';
import FixedPlugin from '../components/FixedPlugin/FixedPlugin';
// Custom components
import MainPanel from '../components/Layout/MainPanel';
import PanelContainer from '../components/Layout/PanelContainer';
import PanelContent from '../components/Layout/PanelContent';
import ManagerNavbar from '../components/Navbars/StudentNavbar';


export default function Dashboard(props) {
	const { ...rest } = props;
	// states and functions
	const [ sidebarVariant, setSidebarVariant ] = useState('transparent');
	const [fixed, setFixed] = useState(false);
	
	// const dispatch = useDispatch(); // Initialize the dispatch

	// const handleLogout = () => {
	// 	dispatch(logoutUser());
	// 	// Optionally, redirect the user to a login page
	// 	return <Redirect to="/auth/signin" />
	// };

	// functions for changing the states from components
	const getRoute = () => {
		return window.location.pathname !== '/admin/full-screen-maps';
	};
	const getActiveRoute = (routes) => {
		let activeRoute = 'Default Brand Text';
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveRoute = getActiveRoute(routes[i].views);
				if (collapseActiveRoute !== activeRoute) {
					return collapseActiveRoute;
				}
			} else if (routes[i].category) {
				let categoryActiveRoute = getActiveRoute(routes[i].views);
				if (categoryActiveRoute !== activeRoute) {
					return categoryActiveRoute;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].name;
				}
			}
		}
		return activeRoute;
	};
	// This changes navbar state(fixed or not)
	const getActiveNavbar = (routes) => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].category) {
				let categoryActiveNavbar = getActiveNavbar(routes[i].views);
				if (categoryActiveNavbar !== activeNavbar) {
					return categoryActiveNavbar;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					if (routes[i].secondaryNavbar) {
						return routes[i].secondaryNavbar;
					}
				}
			}
		}
		return activeNavbar;
	};
	const getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.collapse) {
				return getRoutes(prop.views);
			}
			if (prop.category === 'account') {
				return getRoutes(prop.views);
			}
			if (prop.layout === '/manager') {
				return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
			} else {
				return null;
			}
		});
	};
	const { isOpen, onOpen, onClose } = useDisclosure();
	document.documentElement.dir = 'ltr';
	// Chakra Color Mode
	return (
		<ChakraProvider theme={theme} resetCss={false}>
			<SidebarStudent
				routes={routes}
				logoText={'LIBRARY MANAGEMENT'}
				display='none'
				sidebarVariant={sidebarVariant}
				{...rest}
			/>
			<MainPanel
				w={{
					base: '100%',
					xl: 'calc(100% - 275px)'
				}}>
				<Portal>
					<ManagerNavbar
						onOpen={onOpen}
						logoText={'PURITY UI DASHBOARD'}
						brandText={getActiveRoute(routes)}
						secondary={getActiveNavbar(routes)}
						fixed={fixed}
						{...rest}
					/>
				</Portal>
				{getRoute() ? (
					<PanelContent>
						<PanelContainer>
							{/* Logout Button */}
							
							<Switch>
								{getRoutes(routes)}
								<Redirect from='/admin' to='/admin/dashboard' />
							</Switch>
						</PanelContainer>
					</PanelContent>
				) : null}
				{/* <Footer /> */}
				<Portal>
					<FixedPlugin secondary={getActiveNavbar(routes)} fixed={fixed} onOpen={onOpen} />
					
				</Portal>
				<Configurator
					secondary={getActiveNavbar(routes)}
					isOpen={isOpen}
					onClose={onClose}
					isChecked={fixed}
					onSwitch={(value) => {
						setFixed(value);
					}}
					onOpaque={() => setSidebarVariant('opaque')}
					onTransparent={() => setSidebarVariant('transparent')}
				/>
			</MainPanel>
		</ChakraProvider>
	);
}
