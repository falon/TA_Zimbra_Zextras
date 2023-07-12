import * as SplunkHelpers from './splunk_helpers.js'
// import * as StoragePasswords from './storage_passwords.js'

// all_properties must be a dict with
//  type,
//  syslog_fac,
//  log_level,
//  syslog_socket,
//  logfile_dir,
//  logfile_name,
//  logstdout,
//  adminurl,
//  admin,
//  pwd,
//  nullstr,
//  acc_attributes,
//  list_attributes,
//  ignore_proxy
// passed from app.js to setup_page.js

async function create_custom_configuration_file(
  splunk_js_sdk_service,
  all_properties
) {

  //// Write SOAP Password to passwords.conf
  // var secret_realm = 'TA_Zimbra_Zextras_realm';
  // var secret_name = 'admin';

  //await StoragePasswords.write_secret(
  //    splunk_js_sdk_service,
  //    secret_realm,
  //    secret_name,
  //    all_properties.pwd,
  //);

  // Write the zimbra.conf file
  var custom_configuration_file_name = "zimbra";
  var stanza_name = "Logging";
  var properties_to_update = {
	  TYPE: all_properties.type,
          SYSLOG_FAC: all_properties.syslog_fac,
          LOG_LEVEL: all_properties.log_level,
          SYSLOG_SOCKET: all_properties.syslog_socket,
          LOGFILE_NAME: all_properties.logfile_name,
          LOGSTDOUT: all_properties.logstdout,
  };

  await SplunkHelpers.update_configuration_file(
      splunk_js_sdk_service,
      custom_configuration_file_name,
      stanza_name,
      properties_to_update,
  );

  var stanza_name = "Soap";
  var properties_to_update = {
	  adminUrl: 'https://' + all_properties.adminurl,
	  admin: all_properties.admin,
	  // Remove the following line if you want to use StoragePassword
	  pwd: all_properties.pwd,
	  NullStr: all_properties.nullstr,
  };

  await SplunkHelpers.update_configuration_file(
      splunk_js_sdk_service,
      custom_configuration_file_name,
      stanza_name,
      properties_to_update,
  );

  var stanza_name = "Account";
  var properties_to_update = {
	  Attributes: all_properties.acc_attributes,
  };

  await SplunkHelpers.update_configuration_file(
      splunk_js_sdk_service,
      custom_configuration_file_name,
      stanza_name,
      properties_to_update,
  );

  var stanza_name = "MailingList";
  var properties_to_update = {
	  Attributes: all_properties.list_attributes,
  };

  await SplunkHelpers.update_configuration_file(
      splunk_js_sdk_service,
      custom_configuration_file_name,
      stanza_name,
      properties_to_update,
  );

async function complete_setup(splunk_js_sdk_service) {
  var configuration_file_name = "app";
  var stanza_name = "install";
  var properties_to_update = {
      is_configured: "true",
  };

  await SplunkHelpers.update_configuration_file(
      splunk_js_sdk_service,
      configuration_file_name,
      stanza_name,
      properties_to_update,
  );
};

async function reload_splunk_app(
  splunk_js_sdk_service,
  app_name,
) {
  var splunk_js_sdk_apps = splunk_js_sdk_service.apps();
  await splunk_js_sdk_apps.fetch();

  var current_app = splunk_js_sdk_apps.item(app_name);
  current_app.reload();
};

function redirect_to_splunk_app_homepage(
  app_name,
) {
  var redirect_url = "/app/" + app_name;

  window.location.href = redirect_url;
};


function create_splunk_js_sdk_service(
  splunk_js_sdk,
  application_name_space,
) {
  var http = new splunk_js_sdk.SplunkWebHttp();

  var splunk_js_sdk_service = new splunk_js_sdk.Service(
      http,
      application_name_space,
  );

  return splunk_js_sdk_service;
};

export {
  create_custom_configuration_file,
  complete_setup,
  reload_splunk_app,
  redirect_to_splunk_app_homepage,
  create_splunk_js_sdk_service,
}
