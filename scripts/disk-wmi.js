//This script querys all the properties of the Physycal Disks using 2 parameters,
//the name of the disk and the name of the properties

//if (Wscript.Arguments.Count() != 2) then
//	Wscript.Echo "Incorrect parameters";
//'	Wscript.Quit(1);
//End If

//var diskname = WScript.Arguments.Item(0)
//var counter = WScript.Arguments.Item(1)

var diskname = ""
var counter = "Description";
var wmiquery = "";
var result = "";

var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}!\\\\.\\root\\cimv2");
Set objWMIService = GetObject("winmgmts:\\" & strComputer & "\root\CIMV2")

result = getWmiCounter(counter,)

function getWmiCounter(counters,disks) {
  var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}!\\\\.\\root\\cimv2");
  var wql = "select " + counters + " from Win32_DiskDrive where Name=" + disks;
  for (var e = new Enumerator(wmi.ExecQuery(wql)); !e.atEnd(); e.moveNext())
    return e.item();
} 
