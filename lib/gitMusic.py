from pydub import AudioSegment
import os, sys

path = os.getcwd()+ "\\"
export_path = path + sys.argv[1]
if (sys.argv[1][-1:] != '\\' and sys.argv[1][-1:] != '//'):
    export_path += "\\"
base_track_file = sys.argv[2]
overlay_track_file = sys.argv[3]
pos = sys.argv[4]

base_track = AudioSegment.from_file(path + base_track_file,format=base_track_file[base_track_file.rfind('.')+1:])
overlay_track = AudioSegment.from_file(path + overlay_track_file,format=overlay_track_file[overlay_track_file.rfind('.')+1:])

if (pos < 0):
    merge_track = AudioSegment.silent(duration = len(base_track) - pos)
    merge_track = merge_track.overlay(overlay_track)
    merge_track = merge_track.overlay(base_track,position=-pos)
else:
    merge_track = base_track.overlay(overlay_track,position=pos)
    
file_handle = merge_track.export(export_path + "merged_" + base_track_file[:base_track_file.rfind('.')] + "_" + overlay_track_file[|:overlay_track_file.rfind('.')] + ".mp3",format="mp3")
sys.exit(0)
