import React, { useEffect, useMemo } from 'react';

import { MonitorOutlined, PhoneIphoneOutlined, Subject } from '@mui/icons-material';
import { Box, Stack, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { Reader, renderToStaticMarkup } from '@usewaypoint/email-builder';
import type { SxProps } from '@mui/material/styles';

import EditorBlock from '../../documents/editor/EditorBlock';
import {
  setSelectedScreenSize,
  updateDocument,
  useDocument,
  useSelectedMainTab,
  useSelectedScreenSize,
} from '../../documents/editor/EditorContext';

import ToggleInspectorPanelButton from '../InspectorDrawer/ToggleInspectorPanelButton';
import ToggleSamplesPanelButton from '../SamplesDrawer/ToggleSamplesPanelButton';

import DownloadJson from './DownloadJson';
import HtmlPanel from './HtmlPanel';
import ImportJson from './ImportJson';
import JsonPanel from './JsonPanel';
import MainTabsGroup from './MainTabsGroup';
import ShareButton from './ShareButton';

import { useFrappeCreateDoc, useFrappeDeleteDoc, useFrappeGetDoc, useFrappePutCall, useFrappeUpdateDoc } from 'frappe-react-sdk';
import type { EmailTemplate } from '../../types';

export default function TemplatePanel() {
  const document = useDocument();
  const selectedMainTab = useSelectedMainTab();
  const selectedScreenSize = useSelectedScreenSize();
  const create_mutation = useFrappeCreateDoc();
  const update_doc_mutation = useFrappeUpdateDoc()
  const update_design = useFrappePutCall('frappe.client.set_value');
  const delete_doc = useFrappeDeleteDoc()

  // Get design name from URL hash
  const designNameFromRoute = useMemo(() => {
    const route = window.location.hash;
    if (route.startsWith('#design/')) {
      return decodeURIComponent(route.replace('#design/', ''));
    }
    return undefined;
  }, [window.location.hash]);

  const sampleDesign = useMemo(() => {
    const route = window.location.hash;
    if (route.startsWith('#sample/')) {
      return decodeURIComponent(route.replace('#sample/', ''));
    }
    return undefined;
  }, [window.location.hash]);
  console.log('designNameFromRoute', designNameFromRoute);

  const {
    data: designData,
    isLoading: isDesignLoading,
    error: designError,
    mutate: updateDocumentContext,
  } = useFrappeGetDoc<EmailTemplate>('Email Template', designNameFromRoute);

  // Parse document content once when available
  const parsedDesign = useMemo(() => {
    try {
      return designData?.custom_design ? JSON.parse(designData.custom_design as string) : null;
    } catch (e) {
      console.error('Error parsing design JSON:', e);
      return null;
    }
  }, [designData?.custom_design]);

  // Update document context when parsed design is loaded
  useEffect(() => {
    if (parsedDesign) {
      updateDocument(parsedDesign);
    }
  }, [parsedDesign]);

  const mainBoxSx: SxProps =
    selectedScreenSize === 'mobile'
      ? {
        margin: '32px auto',
        width: 370,
        height: 800,
        boxShadow:
          'rgba(33, 36, 67, 0.04) 0px 10px 20px, rgba(33, 36, 67, 0.04) 0px 2px 6px, rgba(33, 36, 67, 0.04) 0px 0px 1px',
      }
      : { height: '100%' };

  const handleScreenSizeChange = (_: unknown, value: unknown) => {
    if (value === 'mobile' || value === 'desktop') {
      setSelectedScreenSize(value);
    } else {
      setSelectedScreenSize('desktop');
    }
  };

  const renderMainPanel = () => {
    switch (selectedMainTab) {
      case 'editor':
        return (
          <Box sx={mainBoxSx}>
            <EditorBlock id="root" />
          </Box>
        );
      case 'preview':
        return (
          <Box sx={mainBoxSx}>
            <Reader document={document} rootBlockId="root" />
          </Box>
        );
      case 'html':
        return <HtmlPanel />;
      case 'json':
        return <JsonPanel />;
      default:
        return null;
    }
  };

  return (
    <>
      <Stack
        sx={{
          height: 49,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 'appBar',
          px: 1,
        }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <ToggleSamplesPanelButton />
        <Stack px={2} direction="row" gap={2} width="100%" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2}>
            <MainTabsGroup />
          </Stack>
          <Box>
            {
              designNameFromRoute && (
                <button
                  style={{
                    padding: '6px 16px',
                    background: 'red',
                    color: '#ffff',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                  onClick={() => {
                    if (!designNameFromRoute) return;
                    delete_doc.deleteDoc(
                      'Email Template',
                      designNameFromRoute
                    ).then(() => {
                      window.location.hash = '#';

                    });
                  }}
                >
                  {
                    delete_doc.loading ? `Deleting..` : 'Delete Design'
                  }

                </button>
              )
            }
            {
              designNameFromRoute && (
                <button
                  style={{
                    padding: '6px 16px',
                    background: '#1976d2',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                  onClick={() => {
                    // if (!designNameFromRoute) return;

                    update_doc_mutation.updateDoc('Email Template', designNameFromRoute, {
                      custom_design: JSON.stringify(document || {}),
                      use_html: 1,
                      response_html: renderToStaticMarkup(document, { rootBlockId: 'root' })

                    }).then(() => {
                      updateDocumentContext()

                    });
                  }}
                >
                  {
                    update_design.loading ? `Saving..` : 'Save Design'
                  }

                </button>
              )
            }


            {
              sampleDesign && (
                <button
                  style={{
                    padding: '6px 16px',
                    background: '#1976d2',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                  onClick={() => {

                    create_mutation.createDoc(

                      'Email Template',
                      {
                        name: sampleDesign,
                        subject: sampleDesign,
                        custom_design: JSON.stringify(document || {}),
                      }

                    ).then((response) => {
                      console.log('response', response);
                      // updateDocumentContext()

                      window.location.hash = `#design/${response?.name}`;
                    });
                  }}
                >
                  {
                    update_design.loading ? `Copying..` : 'Copy Design'
                  }

                </button>
              )

            }

          </Box>
          <Stack direction="row" spacing={2}>
            <DownloadJson />
            <ImportJson />
            <ToggleButtonGroup value={selectedScreenSize} exclusive size="small" onChange={handleScreenSizeChange}>
              <ToggleButton value="desktop">
                <Tooltip title="Desktop view">
                  <MonitorOutlined fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="mobile">
                <Tooltip title="Mobile view">
                  <PhoneIphoneOutlined fontSize="small" />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
            <ShareButton />
          </Stack>
        </Stack>
        <ToggleInspectorPanelButton />
      </Stack>

      <Box sx={{ height: 'calc(100vh - 49px)', overflow: 'auto', minWidth: 370 }}>
        {designError && <div>Error loading design: {designError.message}</div>}
        {isDesignLoading ? <div>Loading...</div> : renderMainPanel()}
      </Box>
    </>
  );
}
