//This script returns values of counters of SQL SERVER

if (WScript.Arguments.Count() != 3) WScript.Quit(1);

var instance = WScript.Arguments.Item(0);
var database = WScript.Arguments.Item(1);
var counter = WScript.Arguments.Item(2);


switch(counter) {
  case 'ActiveTransactions':
  case 'DataFilesSizeKB':
  case 'Description':
  case 'LogFilesSizeKB':
  case 'LogFilesUsedSizeKB':
    WScript.Echo(PERF_DATABASE_DATABASES_RAWCOUNT(instance,database,counter));
  break;
  case 'State':
    WScript.Echo(PERF_DATABASE_DATABASES_STATE(instance,database,counter));
  break;
  default:
    WScript.Quit(1);  
}
    WScript.Quit(1);

//
function PERF_DATABASE_DATABASES_RAWCOUNT(instance,database,counter) {

    var data = GET_DATABASE_DATABASES_COUNTER(instance,database,counter);
  if (data)
    return data[counter];
  
}

function PERF_DATABASE_DATABASES_STATE(instance,database,counter) {

    var data = GET_DATABASE_DATABASES_STATE(instance,database,counter);
  if (data)
    return data[counter];
  
}

//
function GET_DATABASE_DATABASES_COUNTER(instance,database,counter){
    var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}!\\\\.\\root\\cimv2");
    var wql = "SELECT " + counter + " FROM Win32_PerfFormattedData_MSSQL" + instance + "_MSSQL" + instance + "Databases" + " WHERE Name=" + "'" + database + "'";
    for ( var e = new Enumerator(wmi.ExecQuery(wql)); !e.atEnd(); e.moveNext() )
      return e.item();
}

function GET_DATABASE_DATABASES_STATE(instance,database,counter){
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