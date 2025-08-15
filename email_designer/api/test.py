import frappe


def send_test_email():
    html_message = """
<!DOCTYPE html>
<html>
  <head>
    <link
      rel="preload"
      as="image"
      href="https://d1iiu589g39o6c.cloudfront.net/live/platforms/platform_A9wwKSL6EV6orh6f/images/wptemplateimage_n3eLjsf37dcjFaj5/Narrative.png"
    />
    <link
      rel="preload"
      as="image"
      href="https://ui-avatars.com/api/?name=John+Doe"
    />
  </head>
  <body>
    <div
      style='background-color:#9333EA;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#FFFFFF"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <div style="padding:24px 24px 24px 24px">
                <table
                  align="center"
                  width="100%"
                  cellpadding="0"
                  border="0"
                  style="table-layout:fixed;border-collapse:collapse"
                >
                  <tbody style="width:100%">
                    <tr style="width:100%">
                      <td
                        style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                      >
                        <div style="padding:0px 0px 0px 0px">
                          <div style="padding:0px 0px 0px 0px;text-align:left">
                            <img
                              alt=""
                              src="https://d1iiu589g39o6c.cloudfront.net/live/platforms/platform_A9wwKSL6EV6orh6f/images/wptemplateimage_n3eLjsf37dcjFaj5/Narrative.png"
                              height="16"
                              style="height:16px;outline:none;border:none;text-decoration:none;vertical-align:middle;display:inline-block;max-width:100%"
                            />
                          </div>
                        </div>
                      </td>
                      <td
                        style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                      >
                        <div style="padding:0px 0px 0px 0px">
                          <div style="text-align:right;padding:0px 0px 0px 0px">
                            <img
                              alt="Jordan"
                              src="https://ui-avatars.com/api/?name=John+Doe"
                              height="32"
                              width="32"
                              style="outline:none;border:none;text-decoration:none;object-fit:cover;height:32px;width:32px;max-width:100%;display:inline-block;vertical-align:middle;text-align:center;border-radius:32px"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3
                style="font-weight:bold;text-align:center;margin:0;font-size:20px;padding:24px 24px 0px 24px"
              >
                Last week, your posts received
              </h3>
              <div
                style="font-size:48px;font-weight:bold;text-align:center;padding:16px 24px 0px 24px"
              >
                1,511
              </div>
              <div
                style="font-size:14px;font-weight:bold;text-align:center;padding:0px 24px 16px 24px"
              >
                Post impressions
              </div>
              <div style="text-align:center;padding:16px 24px 24px 24px">
                <a
                  href="https://example.usewaypoint.com/post/1234/analytics"
                  style="color:#FFFFFF;font-size:16px;font-weight:bold;background-color:#C026D3;border-radius:4px;display:inline-block;padding:12px 20px;text-decoration:none"
                  target="_blank"
                  ><span
                    ><!--[if mso
                      ]><i
                        style="letter-spacing: 20px;mso-font-width:-100%;mso-text-raise:30"
                        hidden
                        >&nbsp;</i
                      ><!
                    [endif]--></span
                  ><span>View your analytics →</span
                  ><span
                    ><!--[if mso
                      ]><i
                        style="letter-spacing: 20px;mso-font-width:-100%"
                        hidden
                        >&nbsp;</i
                      ><!
                    [endif]--></span
                  ></a
                >
              </div>
              <h3
                style="font-weight:bold;text-align:center;margin:0;font-size:20px;padding:24px 24px 8px 24px"
              >
                Top performing post last week
              </h3>
              <div style="padding:16px 24px 16px 24px">
                <div
                  style="background-color:#FAFAFA;border-radius:8px;padding:24px 24px 24px 24px"
                >
                  <div
                    style="font-size:16px;font-weight:normal;text-align:left;padding:0px 0px 0px 0px"
                  >
                    So excited to now have drag and drop on Waypoint. This
                    builds on top of our new Navigator feature that we shipped
                    earlier this week 🚢.
                  </div>
                </div>
              </div>
              <div style="text-align:center;padding:16px 24px 16px 24px">
                <a
                  href="https://example.usewaypoint.com/jordanisip/posts"
                  style="color:#f9fafc;font-size:16px;font-weight:bold;background-color:#0D9488;border-radius:4px;display:inline-block;padding:12px 20px;text-decoration:none"
                  target="_blank"
                  ><span
                    ><!--[if mso
                      ]><i
                        style="letter-spacing: 20px;mso-font-width:-100%;mso-text-raise:30"
                        hidden
                        >&nbsp;</i
                      ><!
                    [endif]--></span
                  ><span>Show more</span
                  ><span
                    ><!--[if mso
                      ]><i
                        style="letter-spacing: 20px;mso-font-width:-100%"
                        hidden
                        >&nbsp;</i
                      ><!
                    [endif]--></span
                  ></a
                >
              </div>
              <div style="padding:40px 0px 0px 0px">
                <hr
                  style="width:100%;border:none;border-top:1px solid #EEEEEE;margin:0"
                />
              </div>
              <div
                style="color:#474849;font-size:12px;font-weight:normal;text-align:center;padding:24px 24px 24px 24px"
              >
                Questions? Just reply to this email.
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>

    """

    # Send the HTML email

    try:
        frappe.sendmail(
            recipients=["muqeetmughal786@gmail.com"],
            subject="Stylish HTML Email from Frappe",
            message=html_message
        )
        frappe.msgprint("Test email sent successfully!")
        return "Test email sent successfully!"
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Error sending test email")
        raise e
