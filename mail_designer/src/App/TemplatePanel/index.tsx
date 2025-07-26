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
import { useNavigate, useParams } from 'react-router-dom';
import WELCOME from '../../getConfiguration/sample/welcome';
import ONE_TIME_PASSCODE from '../../getConfiguration/sample/one-time-passcode';
import ORDER_ECOMMERCE from '../../getConfiguration/sample/order-ecommerce';
import POST_METRICS_REPORT from '../../getConfiguration/sample/post-metrics-report';
import RESERVATION_REMINDER from '../../getConfiguration/sample/reservation-reminder';
import RESET_PASSWORD from '../../getConfiguration/sample/reset-password';
import RESPOND_TO_MESSAGE from '../../getConfiguration/sample/respond-to-message';
import SUBSCRIPTION_RECEIPT from '../../getConfiguration/sample/subscription-receipt';
import EMPTY_EMAIL_MESSAGE from '../../getConfiguration/sample/empty-email-message';

export default function TemplatePanel() {
  const params = useParams()
  const navigate = useNavigate()
  const document = useDocument();
  const selectedMainTab = useSelectedMainTab();
  const selectedScreenSize = useSelectedScreenSize();
  const create_mutation = useFrappeCreateDoc();
  const update_doc_mutation = useFrappeUpdateDoc()
  const update_design = useFrappePutCall('frappe.client.set_value');
  const delete_doc = useFrappeDeleteDoc()

  // Get design name from URL hash
  // const designNameFromRoute = useMemo(() => {
  //   const route = window.location.hash;
  //   if (route.startsWith('#design/')) {
  //     return decodeURIComponent(route.replace('#design/', ''));
  //   }
  //   return undefined;
  // }, [window.location.hash]);
  const designNameFromRoute = params.template_name || '';
  const sampleDesignName = params?.sample_name || ''


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
      if (sampleDesignName) {
        switch (sampleDesignName) {
           case 'new':
            return EMPTY_EMAIL_MESSAGE;
          case 'welcome':
            return WELCOME;
          case 'one-time-password':
            return ONE_TIME_PASSCODE;
          case 'order-ecomerce':
            return ORDER_ECOMMERCE;
          case 'post-metrics-report':
            return POST_METRICS_REPORT;
          case 'reservation-reminder':
            return RESERVATION_REMINDER;
          case 'reset-password':
            return RESET_PASSWORD;
          case 'respond-to-message':
            return RESPOND_TO_MESSAGE;
          case 'subscription-receipt':
            return SUBSCRIPTION_RECEIPT;
        }

      } else if (designData?.custom_design) {
        return JSON.parse(designData.custom_design as string);
      } else {
        return EMPTY_EMAIL_MESSAGE
      }
    } catch (e) {
      console.error('Error parsing design JSON:', e);
      return null;
    }
  }, [designData?.custom_design, sampleDesignName]);

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
                <Box sx={{ display: 'inline-block', ml: 1 }}>
                  <Tooltip title="Delete this design">
                    <ToggleButton
                      value="delete"
                      size="small"
                      color="error"
                      sx={{
                        px: 2,
                        fontWeight: 500,
                        fontSize: 14,
                        borderRadius: 2,
                        boxShadow: 1,
                        textTransform: 'none',
                        bgcolor: 'error.main',
                        color: 'error.contrastText',
                        '&:hover': {
                          bgcolor: 'error.dark',
                        },
                        minHeight: 36,
                      }}
                      disabled={delete_doc.loading}
                      onClick={() => {
                        if (!designNameFromRoute) return;
                        delete_doc.deleteDoc('Email Template', designNameFromRoute).then(() => {
                          navigate(`/`);
                        });
                      }}
                    >
                      {delete_doc.loading ? 'Deleting...' : 'Delete Design'}
                    </ToggleButton>
                  </Tooltip>
                </Box>
              )
            }
            {
              designNameFromRoute && (
                <Box sx={{ display: 'inline-block', ml: 1 }}>
                  <Tooltip title="Save changes to this design">
                  <ToggleButton
                    value="save"
                    size="small"
                    color="primary"
                    sx={{
                    px: 2,
                    fontWeight: 500,
                    fontSize: 14,
                    borderRadius: 2,
                    boxShadow: 1,
                    textTransform: 'none',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                    minHeight: 36,
                    }}
                    disabled={update_doc_mutation.loading}
                    onClick={() => {
                    update_doc_mutation.updateDoc('Email Template', designNameFromRoute, {
                      custom_design: JSON.stringify(document || {}),
                      use_html: 1,
                      response_html: renderToStaticMarkup(document, { rootBlockId: 'root' })
                    }).then(() => {
                      updateDocumentContext()
                    });
                    }}
                  >
                    {update_doc_mutation.loading ? 'Saving...' : 'Save Design'}
                  </ToggleButton>
                  </Tooltip>
                </Box>
              )
            }


            {
              sampleDesignName && (
                <Box sx={{ display: 'inline-block', ml: 1 }}>
                  <Tooltip title="Copy this sample as a new design">
                    <ToggleButton
                      value="copy"
                      size="small"
                      color="primary"
                      sx={{
                        px: 2,
                        fontWeight: 500,
                        fontSize: 14,
                        borderRadius: 2,
                        boxShadow: 1,
                        textTransform: 'none',
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                        minHeight: 36,
                      }}
                      disabled={create_mutation.loading}
                      onClick={() => {
                        create_mutation.createDoc(
                          'Email Template',
                          {
                            name: sampleDesignName,
                            subject: sampleDesignName,
                            custom_design: JSON.stringify(document || {}),
                            use_html: 1,
                            response_html: renderToStaticMarkup(document, { rootBlockId: 'root' })
                          }
                        ).then((response) => {
                          navigate(`/templates/${response?.name}`)
                        });
                      }}
                    >
                      {create_mutation.loading ? 'Copying...' : 'Copy Design'}
                    </ToggleButton>
                  </Tooltip>
                </Box>
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
