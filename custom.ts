//% color="#4A90E2" icon="\uf03e" weight=90
namespace אירועי_מסך {

    // משתנה מערכת גלובלי ששומר את הציור הנוכחי שרוצים לבדוק
    let _checkedImage: Image = null;

    /**
     * אירוע מערכת הפעלה (בלוק כובע):
     * מופעל ורץ ברקע כאשר התמונה המצוירת מוצגת כרגע פיזית על מסך הלדים.
     * @param img התמונה שחייבת להופיע על המסך
     * @param handler קוד המשימה שירוץ בפנים
     */
    //% block="כאשר מוצגת התמונה $img"
    //% handlerStatement=true
    //% weight=100
    export function כאשר_מוצגת_תמונה(img: Image, handler: () => void): void {
        control.runInParallel(() => {
            while (true) {
                // בדיקה פיזית של מסך הלדים
                if (isImageOnScreen(img)) {
                    _checkedImage = img; // שומרים את התמונה הנוכחית לבדיקה הבאה
                    handler();
                }
                basic.pause(100); // השהייה קלה למניעת עומס
            }
        });
    }

    /**
     * בלוק תנאי משושה (Boolean Block):
     * בודק האם בלוק החיישן/כפתור שהוכנס אליו אכן מתקיים באותו רגע.
     * @param condition הבלוק המשושה מהחיישנים (למשל: button A is pressed)
     */
    //% block="ובנוסף מתקיים הבלוק $condition"
    //% condition.shadow="boolean"
    //% weight=90
    export function וגם_מתקיים_הבלוק(condition: boolean): boolean {
        // אם התמונה המוצגת נכונה והתנאי המשושה נכון - מחזיר True
        if (_checkedImage && isImageOnScreen(_checkedImage)) {
            return condition;
        }
        return false;
    }

    // פונקציית עזר פנימית הסורקת את מצב הלדים הפיזיים של המכשיר
    function isImageOnScreen(img: Image): boolean {
        if (!img) return false;
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                if (led.point(x, y) != img.pixel(x, y)) {
                    return false;
                }
            }
        }
        return true;
    }
}
