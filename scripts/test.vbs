On Error Resume Next
LOG_FILE = "temp.txt"

strComputer = "."
Set objWMIService = GetObject("winmgmts:\\" & strComputer & "\root\cimv2")
Set colItems = objWMIService.ExecQuery("Select * from Win32_NTLogEvent WHERE LogFile='Application'")

timecheck = Date
WScript.Echo timecheck

For Each objEvent in colItems
	if DateDiff("h",objEvent.TimeGenerated,timecheck) > 24 Then
		writeLog "Category: " & objEvent.Category
        writeLog "Category String: " & objEvent.CategoryString
        writeLog "Computer Name: " & objEvent.ComputerName
        writeLog "Data: " & objEvent.Data
        writeLog "Event Code: " & objEvent.EventCode
        writeLog "Event Identifier: " & objEvent.EventIdentifier
        writeLog "Insertion Strings: " & objEvent.InsertionStrings
        writeLog "Logfile: " & objEvent.Logfile
        writeLog "Message: " & objEvent.Message
        writeLog "Record Number: " & objEvent.RecordNumber
        writeLog "Source Name: " & objEvent.SourceName
        writeLog "Time Generated: " & objEvent.TimeGenerated
        writeLog "Time Written: " & objEvent.TimeWritten
        writeLog "Type: " & objEvent.Type
        writeLog "User: " & objEvent.User 
        writeLog ""  
	End If
Next

Sub writeLog(strText)
  Dim objFSO, objLogFile

  Set objFSO = CreateObject("Scripting.FileSystemObject")  
  Set objLogFile = objFSO.OpenTextFile(LOG_FILE, 8, True)

  objLogFile.WriteLine strText
  objLogFile.Close

  Set objLogFile = Nothing
  Set objFSO = Nothing

End Sub