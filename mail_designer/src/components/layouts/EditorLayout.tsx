
import { Stack, useTheme } from '@mui/material';


import { useInspectorDrawerOpen, useSamplesDrawerOpen } from '../../documents/editor/EditorContext';
import TemplatePanel from '../../App/TemplatePanel';
import InspectorDrawer, { INSPECTOR_DRAWER_WIDTH } from '../../App/InspectorDrawer';
import SamplesDrawer, { SAMPLES_DRAWER_WIDTH } from '../../App/SamplesDrawer';
import { Outlet } from 'react-router-dom';

function useDrawerTransition(cssProperty: 'margin-left' | 'margin-right', open: boolean) {
    const { transitions } = useTheme();
    return transitions.create(cssProperty, {
        easing: !open ? transitions.easing.sharp : transitions.easing.easeOut,
        duration: !open ? transitions.duration.leavingScreen : transitions.duration.enteringScreen,
    });
}
const EditorLayout = () => {
    const inspectorDrawerOpen = useInspectorDrawerOpen();
    const samplesDrawerOpen = useSamplesDrawerOpen();

    const marginLeftTransition = useDrawerTransition('margin-left', samplesDrawerOpen);
    const marginRightTransition = useDrawerTransition('margin-right', inspectorDrawerOpen);

    return (
        <div>



            {/* <Outlet /> */}
            <InspectorDrawer />
            {/* <SamplesDrawer /> */}

            <Stack
                sx={{
                    marginRight: inspectorDrawerOpen ? `${INSPECTOR_DRAWER_WIDTH}px` : 0,
                    // marginLeft: samplesDrawerOpen ? `${SAMPLES_DRAWER_WIDTH}px` : 0,
                    transition: [marginLeftTransition, marginRightTransition].join(', '),
                }}
            >
                <Outlet/>
                {/* <TemplatePanel /> */}
            </Stack>

        </div>
    )
}

export default EditorLayout