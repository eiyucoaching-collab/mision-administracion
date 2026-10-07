# MentorNPC.gd - NPC interactivo de Mentora en el mapa JRPG
extends Area2D

@export var mission_id: int = 1
@export var mentor_name: String = "Comandante Valeria"

func _ready() -> void:
	body_entered.connect(_on_body_entered)

func _on_body_entered(body: Node2D) -> void:
	if body.name == "Player" or body.is_in_group("player"):
		GameState.current_mission = mission_id
		print("⚔️ Entrando en combate de Misión con: ", mentor_name)
		get_tree().change_scene_to_file("res://scenes/BattleStage.tscn")
