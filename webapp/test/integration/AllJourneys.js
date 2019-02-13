jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
		"sap/ui/test/Opa5",
		"ru/rosneft/breakdown/test/integration/pages/Common",
		"sap/ui/test/opaQunit",
		"ru/rosneft/breakdown/test/integration/pages/Worklist",
		"ru/rosneft/breakdown/test/integration/pages/Object",
		"ru/rosneft/breakdown/test/integration/pages/NotFound",
		"ru/rosneft/breakdown/test/integration/pages/Browser",
		"ru/rosneft/breakdown/test/integration/pages/App"
	], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "ru.rosneft.breakdown.view."
	});

	sap.ui.require([
		"ru/rosneft/breakdown/test/integration/WorklistJourney",
		"ru/rosneft/breakdown/test/integration/ObjectJourney",
		"ru/rosneft/breakdown/test/integration/NavigationJourney",
		"ru/rosneft/breakdown/test/integration/NotFoundJourney",
		"ru/rosneft/breakdown/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});