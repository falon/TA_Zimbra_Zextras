
/**
 * This is an example using pure react, with no JSX
 * If you would like to use JSX, you will need to use Babel to transpile your code
 * from JSK to JS. You will also need to use a task runner/module bundler to
 * help build your app before it can be used in the browser.
 * Some task runners/module bundlers are : gulp, grunt, webpack, and Parcel
 */

import * as Setup from "./setup_page.js";

define(["react", "splunkjs/splunk"], function(react, splunk_js_sdk){
  const e = react.createElement;

  class SetupPage extends react.Component {
    constructor(props) {
      super(props);

      this.state = {
        type: 'file',
        syslog_fac: 'syslog',
        log_level: 'DEBUG',
        syslog_socket: '/dev/log',
        logfile_name: 'zimbra.log',
        logstdout: 'false',
        adminurl: '',
        admin: 'admin',
        pwd: '',
        nullstr: 'void',
        acc_attributes: "zimbraId,\n     zimbraMailHost,\n     zimbraSieveRejectMailEnabled,\n     zimbraMailQuota,\n     zimbraQuotaWarnPercent,\n     zimbraQuotaWarnInterval,\n     givenName,\n     sn,\n     mail,\n     zimbraAccountStatus,\n     zimbraMailStatus,\n     zimbraFeatureConversationsEnabled,\n     zimbraPrefSentMailFolder,\n     zimbraMailTrashLifetime,\n     zimbraMailSpamLifetime,\n     zimbraMailSieveScript,\n     zimbraSharedItem,\n     zimbraFeatureMailForwardingEnabled,\n     zimbraFeatureMailForwardingInFiltersEnabled,\n     zimbraFeatureOutOfOfficeReplyEnabled,\n     zimbraPrefOutOfOfficeCacheDuration,\n     zimbraPrefOutOfOfficeReply,\n     zimbraPrefOutOfOfficeStatusAlertOnLogin,\n     zimbraPrefOutOfOfficeReplyEnabled",
        list_attributes: "zimbraMailAlias,\n     zimbraHideInGal,\n     mail,\n     displayName,\n     zimbraMailHost,\n     zimbraDistributionListSendShareMessageToNewMembers,\n     cn,\n     zimbraMailStatus,\n     uid,\n     zimbraId,\n     zimbraCreateTimestamp"
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({ ...this.state, [event.target.name]: event.target.value})
    }

    async handleSubmit(event) {
      event.preventDefault();

      await Setup.perform(splunk_js_sdk, this.state)
    }

    render() {
      return e("div", null, [
        e("h2", null, "Setup Page"),
        e("div", null, [
          e("p", null, "For safety reason here you can see the default values and not the actual values currently set. Remember this, if this is not the first initial setup."),
          e("form", { onSubmit: this.handleSubmit }, [
	    e("h3", null, "Syslog"),
            e("label", null, [
              "LOG Type ",
              e("input", { type: "text", name: "type", value: this.state.type, onChange: this.handleChange })
            ]),
            e("label", null, [
              "Syslog Facility ",
              e("input", { type: "text", name: "syslog_fac", value: this.state.syslog_fac, onChange: this.handleChange })
            ]),
            e("label", null, [
              "LOG Level ",
              e("input", { type: "text", name: "log_level", value: this.state.log_level, onChange: this.handleChange })
            ]),
            e("label", null, [
              "LOG Socket ",
              e("input", { type: "text", name: "syslog_socket", value: this.state.syslog_socket, onChange: this.handleChange })
            ]),
            e("label", null, [
              "LOG File Name ",
              e("input", { type: "text", name: "logfile_name", value: this.state.logfile_name, onChange: this.handleChange })
            ]),
            e("label", null, [
              "LOG to standard output ",
              e("input", { type: "text", name: "logstdout", value: this.state.logstdout, onChange: this.handleChange })
            ]),
            e("h3", null, "SOAP"),
            e("label", null, [
              "Admin URL: https://",
              e("input", { type: "text", name: "adminurl", value: this.state.adminurl, size: 50, onChange: this.handleChange })
            ]),
            e("label", null, [
              "User admin ",
              e("input", { type: "text", name: "admin", value: this.state.admin, onChange: this.handleChange })
            ]),
            e("label", null, [
              "Password ",
              e("input", { type: "password", name: "pwd", value: this.state.pwd, onChange: this.handleChange })
            ]),
            e("label", null, [
              "NULL String ",
              e("input", { type: "text", name: "nullstr", value: this.state.nullstr, onChange: this.handleChange })
            ]),
	    e("h3", null, "Account Request configuration"),
            e("label", null, [
              "Attributes to return ",
              e("textarea", { name: "acc_attributes", value: this.state.acc_attributes, rows: 10, onChange: this.handleChange })
            ]),
	    e("h3", null, "List Request configuration"),
            e("label", null, [
              "Attributes to return ",
              e("textarea", { name: "list_attributes", value: this.state.list_attributes, rows: 10, onChange: this.handleChange })
            ]),
            e("input", { type: "submit", value: "Submit" })
          ])
        ])
      ]);
    }
  }

  return e(SetupPage);
});
