n = 5
Set objWMI = GetObject("winmgmts:\\.\root\cimv2")
Set colObjects = objWMI.ExecQuery("Select * From Win32_Process")
Dim usage1(9999)
Dim name1(9999)
Dim size
Dim finalMes
For Each Item In colObjects
    size = size + 1
    usage1(size) = Item.WorkingSetSize
    name1(size) = Item.name
Next

For i = 1 To size
    For j = i + 1 To size
        If (Int(usage1(i)) < Int(usage1(j))) Then
            temp1 = usage1(j)
            usage1(j) = usage1(i)
            usage1(i) = temp1
            temp2 = name1(j)
            name1(j) = name1(i)
            name1(i) = temp2
        End If
    Next
Next

finalMes = "Top " + CStr(n) + " Memory Consuming Processes" + vbCrLf + vbCrLf
For i = 1 To n
   finalMes = finalMes + name1(i) + " ---> " + CStr(usage1(i) / 1024) + "  KB" + vbCrLf
Next

MsgBox finalMes, vbOKOnly, "On " + CStr(Date) + " At " + CStr(Time)
