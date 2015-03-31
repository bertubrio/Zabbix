//This script discovers all the databases on SQL SERVER instance querying WMI
//and send results in JSON format to use LLD Discovery

if (WScript.Arguments.Count() != 1) WScript.Quit(1);

//
var instance = WScript.Arguments.Item(0);

//
function getWMISQLDatabases(instance) {
	var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}!\\\\.\\root\\cimv2");
  	var wql = "SELECT Name FROM Win32_PerfFormattedData_MSSQL" + instance + "_MSSQL" + instance + "Databases" + "WHERE NOT Name LIKE '%master%' and NOT Name LIKE '%tempdb%' and NOT Name LIKE '%model%' and NOT Name LIKE '%msdb%'";
  	WScript.Echo ("hola");
  	for (var e = new Enumerator(wmi.ExecQuery(wql)); !e.atEnd(); e.moveNext())
    return e.item();
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

var result = getWMISQLDatabases(instance);
print(result);



//var next = false;
//while (!oExec.StdOut.AtEndOfStream) {

//	var line = oExec.StdOut.ReadLine();
	
//	if (next) print("\t,");
//	next = true;

//	print("\t\t{\"{#BDNAME}\":\"" + match[2] + "\"}");
//}