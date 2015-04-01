//This script returns values of counters of SQL SERVER

if (WScript.Arguments.Count() != 2) WScript.Quit(1);

var instance = WScript.Arguments.Item(0);
var counter = WScript.Arguments.Item(1);


//Requests counters of Win32_PerfFormattedData_MSSQL[sqlinstance]MemoryManager
  WScript.Echo(PERF_DATABASE_MEMORY_RAWCOUNT(instance,counter));
  WScript.Quit(1);

//Returns data without treatment
function PERF_DATABASE_MEMORY_RAWCOUNT(instance,counter) {

    var data = GET_DATABASE_MEMORY_COUNTER(instance,counter);
  if (data)
    return data[counter];
  
}

//Query the Win32_PerfFormattedData_MSSQL MemoryManager
function GET_DATABASE_MEMORY_COUNTER(instance,counter){
    var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}!\\\\.\\root\\cimv2");
    var wql = "SELECT " + counter + " FROM Win32_PerfFormattedData_MSSQL" + instance + "_MSSQL" + instance + "MemoryManager";
    for ( var e = new Enumerator(wmi.ExecQuery(wql)); !e.atEnd(); e.moveNext() )
      return e.item();
}
