<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $task = Task::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'description' => $request->description
        ]);

        return response()->json(['message' => 'Task created!', 'task' => $task]);
    }

    public function index()
    {
    $tasks = Task::where('user_id', auth()->id())->latest()->get();

    return response()->json($tasks);
    }

    public function search(Request $request)
    {
    $query = $request->input('q');

    $tasks = Task::where('user_id', auth()->id())
                ->where('name', 'like', "%{$query}%")
                ->orderBy('created_at', 'desc')
                ->get();

    return response()->json($tasks);
    }

    public function show($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $task->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
        ]);

        return response()->json(['message' => 'Task updated successfully']);
    }

    public function destroy($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['error' => 'Task not found.'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully.']);
    }

    public function getTasks()
{
    $tasks = Task::where('user_id', auth()->id())
                 ->orderBy('created_at', 'asc') // ✅ ensures oldest tasks appear first
                 ->get();

    return response()->json($tasks);
}




}
