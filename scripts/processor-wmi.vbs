'This script query some properties of the Processor of the machine.

if Wscript.Arguments.Count <> 1 then
	Wscript.Echo "Incorrect parameters"
	Wscript.Quit(1)
End If

counter = WScript.Arguments(0)


strComputer = "."
wql = "SELECT * FROM Win32_Processor"

Set objWMIService = GetObject("winmgmts:\\" & strComputer & "\root\CIMV2")
Set colItems = objWMIService.ExecQuery(wql)

Select Case counter
	Case "currentclockspeed"
		For Each objItem in colItems
			WScript.Echo Trim(objItem.CurrentClockSpeed)
		Next
	Case "l2cachesize"
		For Each objItem in colItems
			WScript.Echo Trim(objItem.L2CacheSize)
		Next
		Wscript.Quit(1)
	Case "maxclockspeed"
		For Each objItem in colItems
			WScript.Echo Trim(objItem.MaxClockSpeed)
		Next
		Wscript.Quit(1)		
	Case "name"
		For Each objItem in colItems
			WScript.Echo Trim(objItem.Name)
		Next
		Wscript.Quit(1)
	Case "numberofcores"
		For Each objItem in colItems
			WScript.Echo Trim(objItem.NumberOfCores)
		Next
		Wscript.Quit(1)
	Case "numberoflogicalprocessors"
		For Each objItem in colItems
			WScript.Echo Trim(objItem.NumberOfLogicalProcessors)
		Next
		Wscript.Quit(1)
	Case "manufacturer"
		For Each objItem in colItems
			WScript.Echo Trim(objItem.Manufacturer)
		Next
		Wscript.Quit(1)
End Select