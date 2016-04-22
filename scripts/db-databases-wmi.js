//This script returns values of counters of SQL SERVER

if (WScript.Arguments.Count() != 4) WScript.Quit(1);

var instance = WScript.Arguments.Item(0);
var database = WScript.Arguments.Item(1);
var counter = WScript.Arguments.Item(2);
var property = WScript.Arguments.Item(3);

//Different options of query
switch(counter) {
	case 'Databases':
		WScript.Echo(PERF_DATABASE_DATABASE_COUNTER(instance,database,property));
	break;
	case 'MemoryManager':
		WScript.Echo(PERF_DATABASE_MEMORY_COUNTER(instance,property));
	break;
	case 'State':
		WScript.Echo(PERF_DATABASE_DATABASE_STATE(instance,database));
	break;
	case 'SQLErrors':
		WScript.Echo(PERF_DATABASE_SQLERRORS_COUNTER(instance,property));
	break;
	case 'Transactions':
		WScript.Echo(PERF_DATABASE_TRANSACTIONS_COUNTER(instance,property));
	break;
	case 'Jobs':
		WScript.Echo(PERF_INSTANCE_JOBS_COUNTER(instance,property));
	break;
	case 'BufferManager':
		WScript.Echo(PERF_INSTANCE_BUFFERMANAGER_COUNTER(instance,property));
	break;
	case 'SQLStatistics':
		WScript.Echo(PERF_INSTANCE_SQL_STATISTICS_COUNTER(instance,property));
	break;
	case 'GeneralStatistics':
		WScript.Echo(PERF_INSTANCE_GENERAL_STATISTICS_COUNTER(instance,property));
	break;
	case 'Locks':
		WScript.Echo(PERF_INSTANCE_LOCKS_COUNTER(instance,property));
	break;
	default:
    WScript.Quit(1);  
}
    WScript.Quit(1);

//PROCEDURES FOR PERF COUNTERS
	
//Counters of different databases
function PERF_DATABASE_DATABASE_COUNTER(instance,database,property) {

    var data = GET_DATABASE_DATABASE_COUNTER(instance,database,property);
	if (data)
		return data[property];
  
}

//Query the SQL Memory Manager
function PERF_DATABASE_MEMORY_COUNTER(instance,property) {

    var data = GET_DATABASE_MEMORY_COUNTER(instance,property);
	if (data)
		return data[property];
  
}

//Status of the databases
function PERF_DATABASE_DATABASE_STATE(instance,database) {

    var data = GET_DATABASE_DATABASE_STATE(instance,database);
	if (data)
		return data['State'];
  
}

//Query the SQLErrors counter
function PERF_DATABASE_SQLERRORS_COUNTER(instance,property) {

    var data = GET_DATABASE_SQLERRORS_COUNTER(instance,property);
	if (data)
		return data['ErrorsPersec'];
  
}

//Query the SQL Transactions counter
function PERF_DATABASE_TRANSACTIONS_COUNTER(instance,property) {

    var data = GET_DATABASE_TRANSACTIONS_COUNTER(instance,property);
	if (data)
		return data[property];
  
}

//Query the SQL Jobs counter
function PERF_INSTANCE_JOBS_COUNTER(instance,property) {

    var data = GET_INSTANCE_JOBS_COUNTER(instance,property);
	if (data)
		return data[property];

}

//Query Buffer Manager counter
function PERF_INSTANCE_BUFFERMANAGER_COUNTER(instance,property) {
	
	var data = GET_INSTANCE_BUFFER_MANAGER_COUNTER(instance,property);
	if (data)
		return data[property];
}

//Query SQL Statistics counter
function PERF_INSTANCE_SQL_STATISTICS_COUNTER(instance,property) {
	
	var data = GET_INSTANCE_SQL_STATISTICS_COUNTER(instance,property);
	if (data)
		return data[property];
}

function PERF_INSTANCE_GENERAL_STATISTICS_COUNTER(instance,property) {
	
	var data = GET_INSTANCE_GENERAL_STATISTICS_COUNTER(instance,property);
	if (data)
		return data[property];
}

function PERF_INSTANCE_LOCKS_COUNTER(instance,property) {
	
	var data = GET_INSTANCE_LOCKS_COUNTER(instance,property);
	if (data)
		return data[property];
}

//FUNCTIONS

//Query database counters
function GET_DATABASE_DATABASE_COUNTER(instance,database,property){
    var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}!\\\\.\\root\\cimv2");
    var wql = "SELECT " + property + " FROM Win32_PerfFormattedData_MSSQL" + instance + "_MSSQL" + instance + "Databases" + " WHERE Name=" + "'" + database + "'";
    for ( var e = new Enumerator(wmi.ExecQuery(wql)); !e.atEnd(); e.moveNext() )
		return e.item();
}

//Query the MemoryManager
function GET_DATABASE_MEMORY_COUNTER(instance,property){
    var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}!\\\\.\\root\\cimv2");
    var wql = "SELECT " + property + " FROM Win32_PerfFormattedData_MSSQL" + instance + "_MSSQL" + instance + "MemoryManager";
    for ( var e = new Enumerator(wmi.ExecQuery(wql)); !e.atEnd(); e.moveNext() )
		return e.item();
}

//Query the status of a database
function GET_DATABASE_DATABASE_STATE(instance,database){
    var shell = WScript.CreateObject("WScript.Shell");
    var oExec = shell.Exec("osql -E -S localhost\\" + instance + " -Q " + "\"" + "SELECT state FROM sys.databases WHERE name=" + "'" + database + "'" + ";" + "\"");
    var RE = /\d/

    while (!oExec.StdOut.AtEndOfStream) {

		var line = oExec.StdOut.ReadLine();
		var match = RE.exec(line)

		if (match) {
			WScript.Echo(match[0]);
			WScript.Quit(1);
		}
      
    }
}

//Query SQLErrors counter
function GET_DATABASE_SQLERRORS_COUNTER(instance,property){
    var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}!\\\\.\\root\\cimv2");
    var wql = "SELECT ErrorsPersec FROM Win32_PerfFormattedData_MSSQL" + instance + "_MSSQL" + instance + "SQLErrors" + " WHERE Name=" + "'" + property + "'";
    for ( var e = new Enumerator(wmi.ExecQuery(wql)); !e.atEnd(); e.moveNext() )
		return e.item();
}

//Query SQL Transactions counter
function GET_DATABASE_TRANSACTIONS_COUNTER(instance,property){
    var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}!\\\\.\\root\\cimv2");
    var wql = "SELECT " + property + " FROM Win32_PerfFormattedData_MSSQL" + instance + "_MSSQL" + instance + "Transactions";
    for ( var e = new Enumerator(wmi.ExecQuery(wql)); !e.atEnd(); e.moveNext() )
		return e.item();
}

//Query SQL Jobs counter
function GET_INSTANCE_JOBS_COUNTER(instance,property){
    var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}!\\\\.\\root\\cimv2");
    var wql = "SELECT " + property + " FROM Win32_PerfFormattedData_SQLAgent" + instance + "_SQLAgent" + instance + "Jobs" + " WHERE Name=" + "'" + "_Total" + "'";
    for ( var e = new Enumerator(wmi.ExecQuery(wql)); !e.atEnd(); e.moveNext() )
		return e.item();
}

//Query SQL Buffer Manager
function GET_INSTANCE_BUFFER_MANAGER_COUNTER(instance,property){
    var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}!\\\\.\\root\\cimv2");
    var wql = "SELECT " + property + " FROM Win32_PerfFormattedData_MSSQL" + instance + "_MSSQL" + instance + "BufferManager";
    for ( var e = new Enumerator(wmi.ExecQuery(wql)); !e.atEnd(); e.moveNext() )
		return e.item();
}

//Query SQL Statistics
function GET_INSTANCE_SQL_STATISTICS_COUNTER(instance,property){
    var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}!\\\\.\\root\\cimv2");
    var wql = "SELECT " + property + " FROM Win32_PerfFormattedData_MSSQL" + instance + "_MSSQL" + instance + "SQLStatistics";
    for ( var e = new Enumerator(wmi.ExecQuery(wql)); !e.atEnd(); e.moveNext() )
		return e.item();
}

//Query General Statistics
function GET_INSTANCE_GENERAL_STATISTICS_COUNTER(instance,property){
    var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}!\\\\.\\root\\cimv2");
    var wql = "SELECT " + property + " FROM Win32_PerfFormattedData_MSSQL" + instance + "_MSSQL" + instance + "GeneralStatistics";
    for ( var e = new Enumerator(wmi.ExecQuery(wql)); !e.atEnd(); e.moveNext() )
		return e.item();
}

//Query SQL Locks
function GET_INSTANCE_LOCKS_COUNTER(instance,property){
	var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}!\\\\.\\root\\cimv2");
    var wql = "SELECT " + property + " FROM Win32_PerfFormattedData_MSSQL" + instance + "_MSSQL" + instance + "Locks" + " WHERE Name=" + "'" + "_Total" + "'";
    for ( var e = new Enumerator(wmi.ExecQuery(wql)); !e.atEnd(); e.moveNext() )
		return e.item();
}
