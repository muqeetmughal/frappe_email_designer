import React from 'react';

import { Stack, useTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useInspectorDrawerOpen, useSamplesDrawerOpen } from '../documents/editor/EditorContext';

import InspectorDrawer, { INSPECTOR_DRAWER_WIDTH } from './InspectorDrawer';
import SamplesDrawer, { SAMPLES_DRAWER_WIDTH } from './SamplesDrawer';
import TemplatePanel from './TemplatePanel';
import { FrappeProvider } from 'frappe-react-sdk';
import MainLayout from '../components/layouts/MainLayout';
import TemplatesList from '../pages/TemplatesList';
import EditorLayout from '../components/layouts/EditorLayout';
import SamplesList from '../pages/SamplesList';
import GenerateTemplate from '../pages/GenerateTemplate';

function useDrawerTransition(cssProperty: 'margin-left' | 'margin-right', open: boolean) {
  const { transitions } = useTheme();
  return transitions.create(cssProperty, {
    easing: !open ? transitions.easing.sharp : transitions.easing.easeOut,
    duration: !open ? transitions.duration.leavingScreen : transitions.duration.enteringScreen,
  });
}

export default function App() {

  return (
    <>
      <FrappeProvider>
        <Router basename='/mail_designer'>

          {/* <InspectorDrawer />
        <SamplesDrawer />

        <Stack
          sx={{
            marginRight: inspectorDrawerOpen ? `${INSPECTOR_DRAWER_WIDTH}px` : 0,
            marginLeft: samplesDrawerOpen ? `${SAMPLES_DRAWER_WIDTH}px` : 0,
            transition: [marginLeftTransition, marginRightTransition].join(', '),
          }}
        >
          <TemplatePanel />
        </Stack> */}

          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="" element={<TemplatesList />} />
               <Route path="generate" element={<GenerateTemplate />} />

               
              <Route element={<EditorLayout />}>
                <Route path="/templates/:template_name" element={<TemplatePanel />} />
              </Route>
               <Route element={<EditorLayout />}>
                <Route path="/samples/:sample_name" element={<TemplatePanel />} />
              </Route>

            </Route>
          </Routes>
        </Router>

      </FrappeProvider>
    </>
  );
}
