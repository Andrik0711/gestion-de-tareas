<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;


class TaskController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        return auth()->user()->tasks;
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        return auth()->user()->tasks()->create($request->all());
    }

    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $task->update($request->all());

        return $task;
    }

    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);

        $task->delete();

        return response()->noContent();
    }

    public function toggleStatus(Task $task)
    {
        $this->authorize('update', $task);

        $task->status = $task->status === 'pending' ? 'completed' : 'pending';
        $task->save();

        return $task;
    }
}