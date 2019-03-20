sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/m/MessageBox',
	'sap/ui/fl/FakeLrepConnector',
	'sap/m/Image',
	'sap/m/Text',
	'sap/m/FlexItemData',
	'sap/viz/ui5/format/ChartFormatter'
], function (Controller, MessageBox, FakeLrepConnector, Image, Text, FlexItemData, ChartFormatter) {
	"use strict";

	return Controller.extend("ru.rosneft.breakdown.controller.SmartChart", {

		onInit: function () {

		},

		onNavigationTargetsObtained: function (oEvent) {
			var oParameters = oEvent.getParameters();
			var oSemanticAttributes = oParameters.semanticAttributes;

			oParameters.show("Supplier", [], [
				new sap.ui.comp.navpopover.LinkData({
					text: "Go to shopping cart"
				})
			], new sap.ui.layout.form.SimpleForm({
				maxContainerCols: 1,
				content: [
					new sap.ui.core.Title({
						text: "Установка"
					}), new Image({
						src: "test-resources/sap/ui/documentation/sdk/images/HT-1052.jpg", // oSemanticAttributes.ProductPicUrl,
						densityAware: false,
						width: "50px",
						height: "50px",
						layoutData: new FlexItemData({
							growFactor: 1
						})
					}), new Text({
						text: oSemanticAttributes.Description
					})
				]
			}));
		},

		onNavigate: function (oEvent) {
			var oParameters = oEvent.getParameters();
			if (oParameters.text === "Homepage") {
				return;
			}
			MessageBox.show(oParameters.text + " has been pressed", {
				icon: MessageBox.Icon.INFORMATION,
				title: "SmartChart demo",
				actions: [
					MessageBox.Action.OK
				]
			});
		},
		onVizSetings: function () {
			//set maxHeight for categoryAxis in order to allow longer labels being fully displayed
			var oSmartChart = this.getView().byId("smartChartGeneral");
			var oVizChart = oSmartChart.getChart();
			var formatPattern = ChartFormatter.DefaultPattern;
			oVizChart.setVizProperties({
				categoryAxis: {
					layout: {
						maxHeight: 0.8
					},
					label: {
						angle: 45
					}
				},
				plotArea: {
					dataLabel: {
						formatString: formatPattern.SHORTFLOAT_MFD2,
						visible: true,
						showTotal: true
					},
					dataShape: {
						primaryAxis: ["line", "bar", "bar", "bar", "bar", "bar", "bar", "bar"]
					}
				}
			});
			var mData = {
				'customDataControl': function (data) {
					if (data.data.val) {
						var values = data.data.val,
							aContent = [];
						values.forEach(function (item, i, arr) {
							if (item.type === "Dimension") {
								aContent.push(new sap.m.Label({
									text: item.name
								}));
								aContent.push(new sap.m.Text({
									text: item.value
								}));
							}
							if (item.type === "Measure") {
								aContent.push(new sap.m.Label({
									text: item.name
								}));
								if (item.bothValue) {
									aContent.push(new sap.m.Text({
										text: item.bothValue.value + ' %'
									}));
								} else {
									aContent.push(new sap.m.Text({
										text: item.value + ' ч.'
									}));
								}
							}
						});
					}
					return new sap.ui.layout.form.SimpleForm({
						maxContainerCols: 2,
						labelMinWidth: 40,
						content: aContent
					});
				}
			};
			var oPopOver = new sap.viz.ui5.controls.Popover(mData);
			oPopOver.setFormatString(formatPattern.STANDARDFLOAT);
			oPopOver.connect(oVizChart.getVizUid());
			oSmartChart = this.getView().byId("smartChartPercent");
			oVizChart = oSmartChart.getChart();
			oPopOver.connect(oVizChart.getVizUid());
			oVizChart.setVizProperties({
				categoryAxis: {
					layout: {
						maxHeight: 0.8
					}
				},
				plotArea: {
					dataLabel: {
						visible: true
					}
				}
			});
		},
		onExit: function () {}
	});
});