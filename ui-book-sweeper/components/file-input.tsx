import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputFile() {
    return (
        <div className="grid w-full max-w-sm items-center gap-4">
            <Label htmlFor="picture">Upload a cover image</Label>
            <Input id="picture" type="file" />
        </div>
    )
}
