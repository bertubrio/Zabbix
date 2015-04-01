//This script discovers all the databases on SQL SERVER instance querying WMI
//and send results in JSON format to use LLD Discovery

if (WScript.Arguments.Count() != 1) WScript.Quit(1);

//
var instance = WScript.Arguments.Item(0);

//
function getWMISQLDatabases(instance) {
	var result = new Array();
	var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}!\\\\.\\root\\cimv2");
  	var wql = "SELECT Name FROM Win32_PerfFormattedData_MSSQL" + instance + "_MSSQL" + instance + "Databases" + " " + "WHERE NOT Name LIKE '%master%' and NOT Name LIKE '%tempdb%' and NOT Name LIKE '%model%' and NOT Name LIKE '%msdb%'";
  	for ( var e = new Enumerator(wmi.ExecQuery(wql)); !e.atEnd(); e.moveNext() )
  		result.push(e.item().Name);
  	return result;
}

//
function openJSON() {
	print("{\n");
	print("\t\"data\":");
	print("\t[");
}

//
function closeJSON(){
	print("\t]");
	print("}");
}

function print(text) { WScript.Echo(text); }

var next = false;
var data = getWMISQLDatabases(instance);

if (data) {

	openJSON();
	
	for ( var i = 0; i < data.length; i++ ) {

	if (next) print("\t,");
	next = true;

	print("\t\t{\"{#DBNAME}\":\"" + data[i] + "\"}");
	}

	closeJSON();
}