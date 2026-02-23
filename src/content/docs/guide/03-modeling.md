---
title: พื้นฐานการสร้างโมเดล (Modeling Basics)
description: การกำหนด Grid, Stories และวัสดุ
sidebar:
  order: 3
---

## การเริ่มโมเดลใหม่ (New Model)

เริ่มต้นโครงสร้างใหม่ด้วยการไปที่ **File > New Model** (หรือกด `Ctrl+N`) หน้าต่าง _Model Initialization_ จะปรากฏขึ้น:

1.  เลือก **Use Built-in Settings With:**
2.  ตั้งค่าหน่วยและมาตรฐานการออกแบบ:
    - **Display Units:** `Metric MKS` (แนะนำสำหรับไทย -> หน่วย kg, meter)
    - **Steel Section Database:** `AISC14` หรือ `Eurocode`
    - **Steel Design Code:** `AISC 360-16` / `Eurocode 3`
    - **Concrete Design Code:** `ACI 318-19` / `Eurocode 2`
3.  กด **OK**

---

## ระบบพิกัดและเส้น Grid (Grid Systems)

หลังจากกด OK จะพบหน้าต่าง _New Model Quick Templates_:

### Grid Dimensions (สำหรับแปลน)

- **Number of Grid Lines:** จำนวนเส้นกริดในแกน X และ Y
- **Grid Spacing (Uniform):** ระยะห่างระหว่างเส้นกริด (ถ้าเสาห่างเท่ากันหมด)
- **Custom Grid Spacing:** เลือก _Edit Grid Data..._ หากระยะห่างเสาไม่เท่ากัน (นิยมใช้ตัวนี้)

> **Tipสำหรับตึกสูง:** ควรวาง Grid ให้ครอบคลุมตำแหน่ง Core Wall และเสาทุกต้น เพื่อความสะดวกในการวาดและอ่านผล

---

## การกำหนดชั้นอาคาร (Story Data)

### Story Dimensions

- **Number of Stories:** จำนวนชั้นทั้งหมด
- **Typical Story Height:** ความสูงชั้นมาตรฐาน (เช่น 3.00 - 3.50 ม.)
- **Bottom Story Height:** ความสูงชั้นล่างสุด (อาจสูงกว่าชั้นอื่นเพราะมี Lobby)

### Custom Story Data (สำคัญ)

คลิก _Edit Story Data..._ เพื่อตั้งค่าละเอียด:

- **Label:** ชื่อชั้น (เช่น 1F, 2F, 3F, ..., Roof)
- **Height/Elevation:** ระดับความสูงจริง
- **Master Story:** กำหนดชั้นต้นแบบ (เช่น ให้ชั้น 3F เป็น Master)
- **Similar To:** สั่งให้ชั้นอื่นๆ (4F-10F) อ้างอิงชั้น Master (เมื่อแก้ไข Master ชั้นอื่นจะแก้ตามทันที ช่วยลดเวลาทำงานมหาศาลสำหรับตึกสูง)

เลือก **Grid Only** แล้วกด **OK** เพื่อเริ่มเข้าสู่หน้าจอทำงาน

---

## การกำหนดวัสดุ (Material Properties)

ไปที่เมนู **Define > Material Properties** เพื่อเตรียมวัสดุที่จะใช้

> [!CAUTION]
> **สำคัญมาก! ตรวจสอบหน่วยก่อนกรอกตัวเลข**
> ให้มองที่มุมขวาล่างของหน้าจอว่าหน่วยเป็น **Metric MKS** หรือไม่
>
> - ถ้าเห็น `lb/ft` หรือ `kip-in` ให้เปลี่ยนเป็น `kg-m` หรือ `Ton-m` ก่อน
> - **ห้ามกรอกเลข 2400 ในช่องที่หน่วยเป็น lb/ft³ เด็ดขาด!** (เพราะคอนกรีตจะหนักมหาศาล)

### 1. คอนกรีต (Concrete)

1.  คลิก **Add New Material**
2.  เลือก Region: `User`, Material Type: `Concrete`
3.  ตั้งชื่อ (เช่น `C35` หรือ `Conc240ksc`)
4.  **Weight per unit volume:** `2400` kg/m³ (หรือ 23.54 kN/m³)
5.  **Modulus of Elasticity (E):** คำนวณตามสูตร (เช่น $4700\sqrt{f'c}$) หรือใช้ค่ามาตรฐาน
6.  **Design Property (f'c):** กำลังอัดของคอนกรีตทรงกระบอก (Cylinder) หน่วย MPa
    > **Note:** ถ้าใช้ fc' แบบ Cube (รูปลูกบาศก์) ต้องแปลงเป็น Cylinder ก่อน (คูณด้วย ~0.83)

### 2. เหล็กเสริม (Rebar)

1.  คลิก **Add New Material**, เลือก Type: `Rebar`
2.  ตั้งชื่อ (เช่น `SD40` หรือ `DB-SD40`)
3.  **Design Property (Fy, Fu):**
    - **SD40:** Minimum Yield (Fy) = `400` MPa, Tensile (Fu) = `570` MPa
    - **SD50:** ใช้สำหรับตึกสูงเพื่อลดขนาดหน้าตัดเสา

### 3. เหล็กรูปพรรณ (Steel) - _ถ้ามี_

ใช้ Type: `Steel` และเลือกเกรดตามมาตรฐาน (เช่น A36, A572 Gr.50)

---

---

## ✍️ Tutorial: ลองทำตาม (Workshop)

เพื่อให้เห็นภาพชัดเจน เรามาลองสร้างโปรเจกต์ **"คอนโดมิเนียมสูง 30 ชั้น"** ไปพร้อมๆ กันครับ

### 1. เริ่มต้นโครงการ (Start New Model)

1.  คลิกเมนู **File > New Model** (หรือกด `Ctrl+N`)
2.  ในหน้าต่าง _Model Initialization_ เลือก **Use Built-in Settings With:**
    - **Display Units:** เลือก `Metric MKS` (สำคัญ! เพื่อให้หน่วยเป็น kg/m)
    - **Steel Section Database:** เลือก `AISC14`
    - **Steel Design Code:** เลือก `AISC 360-16`
    - **Concrete Design Code:** เลือก `ACI 318-19`
3.  กดปุ่ม **OK**

### 2. ตั้งค่า Grid และ Story (Templates)

หน้าต่าง _New Model Quick Templates_ จะเด้งขึ้นมา:

**A. Grid Dimensions (เสา):**

- **Number of Grid Lines X:** ใส่ `6`
- **Number of Grid Lines Y:** ใส่ `4`
- **Spacing X:** ใส่ `6.0`
- **Spacing Y:** ใส่ `6.0`

**B. Story Dimensions (ชั้น):**

- **Number of Stories:** ใส่ `30`
- **Typical Story Height:** ใส่ `3.0`
- **Bottom Story Height:** ใส่ `4.0`

**C. Custom Story Data (แก้ไขชั้น Master):**

1.  คลิกปุ่ม **Edit Story Data...**
2.  ในตาราง ให้แก้ชั้น **Story30** (บนสุด):
    - ช่อง **Master Story** เปลี่ยนเป็น `Yes`
3.  แก้ชั้น **Story2** ถึง **Story29**:
    - ช่อง **Similar To** เลือกเป็น `Story30`
4.  กด **OK** (เพื่อปิดหน้าต่าง Story Data)

**D. Finish:**

- คลิกเลือกปุ่ม **Grid Only** (ด้านซ้ายล่าง)
- กด **OK** (หน้าจอจะตัดเข้าสู่พื้นที่ทำงาน)

### 3. สร้างวัสดุ (Define Materials)

ไปที่เมนู **Define > Material Properties**:

**A. คอนกรีต C35:**

1.  คลิก **Add New Material** -> เลือก `User` / `Concrete` -> กด OK
2.  **Material Name:** แก้เป็น `C35`
3.  **Weight per unit vol:** ใส่ `2400` (ตรวจสอบหน่วยหลังช่องต้องเป็น `kgf/m³`)
4.  **Modulus (E):** ให้สังเกตหน่วยด้านหลัง
    - ถ้าเป็น **kgf/mm²:** ให้ใส่ **`2780`** (หรือ 278,000 หาร 100)
    - ถ้าเป็น **ksc:** ให้ใส่ **`278000`**
    - _Tip:_ พิมพ์ `278000 ksc` ลงในช่องได้เลย โปรแกรมจะแปลงค่าที่ถูกต้องตามหน่วยปัจจุบันให้เอง
5.  **Design Property (fc'):** สังเกตหน่วย
    - ถ้าเป็น **kgf/mm²:** ให้ใส่ **`3.5`**
    - ถ้าเป็น **ksc:** ให้ใส่ **`350`**
    - กด OK สองครั้ง

**B. เหล็กเสริม SD40:**

1.  คลิก **Add New Material** -> เลือก `User` / `Rebar` -> กด OK
2.  **Material Name:** แก้เป็น `SD40`
3.  **Design Property (Fy, Fu):** สังเกตหน่วย
    - **ถ้าเป็น kgf/mm²:**
      - Fy = **`40`**
      - Fu = **`57`**
    - **ถ้าเป็น ksc:**
      - Fy = **`4000`**
      - Fu = **`5700`**
    - กด OK

ในบทต่อไป เราจะใช้วัสดุและ Grid นี้ในการขึ้นโมเดลครับ
